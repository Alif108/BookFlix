import React, { Component }  from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Book = props => (
  <Col>
    <div onClick={() => window.location.href = '/books/'+props.book._id}>
      <Card style={{ width: '15rem' }}>
        <Card.Body>
          <Card.Img variant="top" src= { 'http://localhost:5000'+props.book.coverLocation } />
          <Card.Title>{ props.book.title }</Card.Title>
          <Card.Title>{ props.book.author }</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{ props.book.genre }</Card.Subtitle>
        </Card.Body>
      </Card>
    </div>
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
      <div>
        {this.showBookList()}
      </div>
    );
  }
}