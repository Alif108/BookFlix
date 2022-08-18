import React, { Component }  from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
        <h6>{props.book.genre.name}</h6>
      </Row>

  </Container>
  </Col>

)

export default class MyList extends Component{
  constructor(props){
    super(props);

    this.state = {
      books: [],
    };
  }

  async componentDidMount(){
    axios.get('http://localhost:5000/books/user/getMyList', {
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


  bookList(){
    return this.state.books.map(currentbook => {
      return (
        <div>
            <Book book={currentbook} key={currentbook._id}/>
            <Link to={"/books/removeMyList/" + currentbook._id} className="nav-link">Remove From List</Link>
        </div>
      );
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
        {this.showBookList()}
      </Container>
    );
  }
}