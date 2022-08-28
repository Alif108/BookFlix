import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { Container } from "@mui/material";
import Card from 'react-bootstrap/Card';

const Author = props => (
    <Col>
      <div>
        <Card style={{ width: '15rem' }} onClick={() => window.location.href = '/authors/'+props.author._id}>
          <Card.Body>
              <Row>
                  <img src= { 'http://localhost:5000'+props.author.photoLocation } style={{height:280, width:200}}/>
              </Row>
            <Card.Title>{ props.author.name }</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{ props.author.description }</Card.Subtitle>
          </Card.Body>
        </Card>
      </div>
    </Col>
  )

  const Book = props => (
    <Col>
    <Container style={{backgroundColor:"white", borderRadius:20, margin:20, padding:20 }} onClick={() => window.location.href = '/books/'+props.book._id} fluid>
  
        <Row>
          <img src= { 'http://localhost:5000'+props.book.coverLocation } style={{height:280, width:200}}/>
        </Row>
        <Row>
          <h4>{props.book.title} </h4>
        </Row>
  
    </Container>
    </Col>
  )

export default class AuthorProfile extends Component{
  constructor(props){
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);

    this.state = {
      imgg: '',
      author: [],
      books: [],
      user: [],
      id: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1],
    };
  }

  componentDidMount(){
    axios.get('http://localhost:5000/authors/'+this.state.id, {
      method: 'GET',
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then(response => {  
        this.setState({
          user: response.data.user,
          author: response.data.author,
          books: response.data.books,
        });
      })
      .catch(function(error){
        console.log(error);
      }
    );
  }

  renderAuthorProfile(){
    // return this.state.author.map((author) => {
    //   return <Author author={author} key={author._id}/>;
    // });
    return (
        <Author author={this.state.author} key={this.state.author._id}/>
    );
  }

  bookList(){
    return this.state.books.map(currentbook => {
      return <Book book={currentbook} key={currentbook._id}/>;
    })
  }

  renderBookList(){
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
      <div>
        <Row>
          <Col></Col>
            { this.renderAuthorProfile() }
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
            { this.renderBookList() }
          <Col></Col>
        </Row>
      </div>
    );
  }
}