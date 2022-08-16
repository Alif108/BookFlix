import React, { Component }  from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Container } from "@mui/material";

const Book = props => (
  <Col>
  <Container style={{backgroundColor:"white", borderRadius:20, margin:20, padding:20 }} onClick={() => window.location.href = '/books/'+props.book._id} fluid>

      <Row>
        <img src= { 'http://localhost:5000'+props.book.coverLocation } style={{height:280, width:200}}/>
      </Row>
      <Row>
        <h4>{props.book.title} </h4>
      </Row>
      <Row>
        <h6> {props.book.author}</h6>
      </Row>
      <Row>
        <h6>{props.book.genre}</h6>
      </Row>

  </Container>
  </Col>

)

export default class BookList extends Component{
  constructor(props){
    super(props);

    this.state = {
      query: "",
      books: [],
    };

    this.searchBook = this.searchBook.bind(this);
  }

  async componentDidMount(){
    axios.get('http://localhost:5000/books/', {
      method: 'GET',
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then(response => {
        this.setState({
          books: response.data,
        });
      })
      .catch(function(error){
        console.log(error);
      }
    );
  }

  async searchBook(event)
  {
    event.preventDefault();
    this.setState({query: event.target.value});
    console.log(this.state.query);

    if(this.state.query === ""){
      alert("Please enter a valid Query");
    }

    axios.get('http://localhost:5000/books/searchBook/'+this.state.query, {
      method: 'GET',
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then(response => {
        // console.log(response.data);
        if(response.data.length === 0){
          alert("No book found");
        }
        else
          this.setState({
            books: response.data,
          });
      })
      .catch(function(error){
        console.log(error);
      }
    );
  }

  bookList(){
    return this.state.books.map(currentbook => {
      return <Book book={currentbook} key={currentbook._id}/>;
    })
  }

  showBookList(){
    if(this.state.books.length > 0){
      return (
        <div>
          <Row xs={1} md={5} className="g-4">
              {this.bookList()}
          </Row>
        </div>
      );
    }
  }

  render(){
    return (


      <Container style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"center", backgroundColor:"#fff0cc"}}>
        <br />
        <form onSubmit={this.searchBook}>
          <input id="query" placeholder="Title or Author or Genre" type="text" onChange={event => this.setState({query: event.target.value})} value={this.state.query}/>
          <button type="submit">Search</button>
        </form>
        <br />
        {this.showBookList()}
        
      </Container>
    );
  }
}