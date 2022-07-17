import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from 'axios';


export default class Book extends Component{
  constructor(props){
    super(props);

    this.state = {
      book: [],
      id: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1],
    };
  }

  componentDidMount(){
    axios.get('http://localhost:5000/books/'+this.state.id)
      .then(response => {  
        this.setState({
          book: response.data,
        });
      })
      .catch(function(error){
        console.log(error);
      }
    );
  }

  renderButton(){
    if (true) {
      return (
        <div>
          <Link to={'/books/edit/'+this.state.book._id}>
            Edit
          </Link>
          <br/>
          <Link to={'/admin/addbook'}>
            Remove
          </Link>
      </div>
      );
    }
  }

  render(){
    return (
      <div>
        <Row>
          <Col></Col>
          <Col>
            <img src= {'localhost:5000'+this.state.book.coverLocation} alt="" height='350px' width='250px'/>
            { this.renderButton() }
          </Col>
          <Col>
            <h1>{this.state.book.title}</h1>
            <h3>{this.state.book.author}</h3>
            <h5>{this.state.book.genre}</h5>
            <p>{this.state.book.description}</p>
          </Col>
          <Col></Col>
        </Row>
      </div>
    );
  }
}