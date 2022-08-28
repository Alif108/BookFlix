import React, { Component }  from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/esm/Container";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { margin } from "@mui/system";

const Book = props => (
  <Col>
  <Container style={{backgroundColor:"#fff0cc", width:"50vw", height:"100", borderRadius:10, padding: 20}} onClick={() => window.location.href = '/books/'+props.book._id} fixed>
    <Row>
      <Col xs={1}  style={{width: "200px"}}>
        <Row>
          <img src= { 'http://localhost:5000'+props.book.coverLocation } style={{height:210, width:165}}/>
        </Row>
      </Col>
      <Col xs={8} style={{margin:0, paading:0}} fluid>
      <Typography style={{fontSize:26, fontFamily:'Roboto'}}>{props.book.title}</Typography>
      <Typography style={{fontSize:18, color:"red", fontFamily:'Roboto'}}>{props.book.author}</Typography>
      <Typography style={{fontSize:14, color:"brown", fontFamily:'Roboto'}}>{props.book.genre.name}</Typography>
      <Typography class="text-truncate" style={{fontSize:14, fontFamily:'Roboto'}}>{props.book.description}</Typography>
              
      </Col>
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

  async handleKeyDown(event) {
    if (event.key === 'Enter') {
      this.searchBook(event);
    }
  }

  bookList(){
    return this.state.books.map(currentbook => {
      return <Book book={currentbook} key={currentbook._id}/>;
    })
  }

  showBookList(){
    if(this.state.books.length > 0){
      return (
        <Container fluid>
          <Row xs={1} md={1} className="g-4">
              {this.bookList()}
          </Row>
        </Container>
      );
    }
  }

  render(){
    return (
      <Container style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"center"}}>
        <br />
        <Container style={{width:"50vw", margin:20}}>
          <Form class="form-inline my-2 my-lg-0" style={{display:"flex",flexDirection: "row", }}>
          <input class="form-control mr-sm-2" type="search" placeholder="Search by Title or Author" aria-label="Search" onChange={event => this.setState({query: event.target.value})} value={this.state.query}/>
          <Button variant='btn btn-warning my-2 my-sm-0' type="submit" onClick={this.searchBook}>Search</Button>
          </Form>
        </Container>
        <br />
        <Container fluid>
          {this.showBookList()}
        </Container>
      </Container>
    );
  }
}