import React, { Component }  from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const BookRequest = props => (
  <Col>
    <div>
      <Card style={{ width: '15rem' }}>
        <Card.Body>
          <Card.Title>{ props.book.title }</Card.Title>
          <Card.Subtitle>{ props.book.author }</Card.Subtitle>
          <Card.Text>ISBN: { props.book.isbn }</Card.Text>
          <Card.Text>Publisher: { props.book.publisher }</Card.Text>
          <Card.Text>Publishing Year: { props.book.publishingYear }</Card.Text>
          <Card.Text>{ props.book.description }</Card.Text>
        </Card.Body>
      </Card>
    </div>
  </Col>
)

export default class ShowBookRequests extends Component{
  constructor(props){
    super(props);

    this.state = {
      query: "",
      bookReq: [],
    };

    this.searchBookRequest = this.searchBookRequest.bind(this);
  }

  async componentDidMount(){
    axios.get('http://localhost:5000/requestBook/requests', {
      method: 'GET',
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then(response => {
        this.setState({
          bookReq: response.data,
        });
      })
      .catch(function(error){
        console.log(error);
      }
    );
  }

  async searchBookRequest(event)
  {
    event.preventDefault();
    this.setState({query: event.target.value});
    console.log(this.state.query);

    if(this.state.query === ""){
      alert("Please enter a valid Query");
    }

    axios.get('http://localhost:5000/requestBook/searchBookRequest/'+this.state.query, {
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
            bookReq: response.data,
          });
      })
      .catch(function(error){
        console.log(error);
      }
    );
  }

  bookReqList(){
    return this.state.bookReq.map(currentReq => {
      return <BookRequest book={currentReq} key={currentReq._id}/>;
    })
  }

  showBookReqList(){
    if(this.state.bookReq.length > 0){
      return (
        <div>
          <Row xs={1} md={5} className="g-4">
              {this.bookReqList()}
          </Row>
        </div>
      );
    }
  }

  render(){
    return (
      <div>

        <form onSubmit={this.searchBookRequest}>
          <input id="query" placeholder="Title or Author" type="text" onChange={event => this.setState({query: event.target.value})} value={this.state.query}/>
          <button type="submit">Search</button>
        </form>

        {this.showBookReqList()}
        
      </div>
    );
  }
}