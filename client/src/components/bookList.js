import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const Book = props => (
  <Col>
    <div onClick={() => window.location.href = '/books/'+props.book._id}>
      <Card style={{ width: '15rem' }}>
        <Card.Body>
          <Card.Img variant="top" src= { 'localhost:5000'+props.book.coverLocation } />
          <Card.Title>{ props.book.title }</Card.Title>
          <Card.Title>{ props.book.author }</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{ props.book.genre }</Card.Subtitle>
        </Card.Body>
      </Card>
    </div>
  </Col>
)

export default class BookList extends Component{
  constructor(props){
    super(props);

    this.state = {
      books: [],
    };
  }

  async componentDidMount(){
    axios.get('http://localhost:5000/books/')
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
      return <Book book={currentbook} key={currentbook._id}/>;
    })
  }

  render(){
    return (
      <div>
        <Row xs={1} md={5} className="g-4">
            {this.bookList()}
        </Row>
        <img src="localhost:5000/covers/The Godfather_1969.jpg" alt=""/>
      </div>
    );
  }
}