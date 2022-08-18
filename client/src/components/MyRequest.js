import React, { Component }  from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Container } from "@mui/material";

const BookRequest = props => (
  <div>
  <Row>
    <Col >
      <b>{ props.book.title }</b><br/>
      Author: { props.book.author }<br/>
      Isbn: { props.book.isbn }<br/>
      Publisher: { props.book.publisher }<br/>
      Year: { props.book.publishingYear }<br/>
    </Col>
    <Col>
      <br/>
      Description: <br/>
      { props.book.description }
    </Col>
    <Col>
      <br/>
      <br/>
      { props.book.status }
    </Col>
    <Col>
      <br/>
      <br/>
      {/* if status accepted go to book profile */}
      { props.book.status === "Accepted" ? <button onClick={() => props.handleView(props.book._id)}>View</button> : null }
    </Col>

  </Row>
  <br/>
  </div>
)

export default class MyRequest extends Component{

  constructor(props){
    super(props);

    this.state = {
      query: "",
      bookReq: [],
    };

    this.searchBookRequest = this.searchBookRequest.bind(this);
    this.handleView = this.handleView.bind(this);
    
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

  async searchBookRequest(event){
    event.preventDefault();
    axios.get('http://localhost:5000/requestBook/searchBookRequest/' + this.state.query, {
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

  async handleView(id){
    //load book profile
    const book = this.state.bookReq.find(book => book._id === id);
    window.location = '/books/' + book.link;
  }

  bookReqList(){
    return this.state.bookReq.map(currentReq => {
        return <BookRequest book={currentReq} key={currentReq._id} handleView={this.handleView}/>;
    });
  }

  showBookReqList(){
    if(this.state.bookReq.length > 0){
      return (
        <div>
          {this.bookReqList()}
        </div>
      );
    }
  }

  render(){
    return (
      <div>
        <Container style={{align: 'center'}}>
          <form onSubmit={this.searchBookRequest}>
            <input id="query" placeholder="Title or Author" type="text" onChange={event => this.setState({query: event.target.value})} value={this.state.query}/>
            <button type="submit">Search</button>
          </form>
        </Container>
        <br/>
        <Container>
          <div style={{align:'center'}}>
            {this.showBookReqList()}
          </div>
        </Container>
      </div>
    );
  }
} 