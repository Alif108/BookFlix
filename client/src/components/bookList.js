import React, { Component }  from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

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
      <div>

        <form onSubmit={this.searchBook}>
          <input id="query" placeholder="Title or Author or Genre" type="text" onChange={event => this.setState({query: event.target.value})} value={this.state.query}/>
          <button type="submit">Search</button>
        </form>

        {this.showBookList()}
        
      </div>
    );
  }
}