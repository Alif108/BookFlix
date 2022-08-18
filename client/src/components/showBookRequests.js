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
      Add Id of book: <br/>
      <input type="text" name="link" value={ props.book.link } onChange={ (e) => { props.onChange(e, props.book._id) } } />
    </Col>
    <Col>
      <br/>
      <br/>
      <button onClick={() => props.handleAccept(props.book._id)}>Accept</button>
      <button onClick={() => props.handleReject(props.book._id)}>Reject</button>
    </Col>
    <hr/>
  </Row>
  <br/>
  </div>
)


export default class ShowBookRequests extends Component{
  constructor(props){
    super(props);

    this.state = {
      query: "",
      bookReq: [],
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.searchBookRequest = this.searchBookRequest.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleReject = this.handleReject.bind(this);
    this.onChange = this.onChange.bind(this);

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



  async handleAccept(id){
    const book = this.state.bookReq.find(book => book._id === id);
    book.status = "Accepted";
    this.setState({bookReq: this.state.bookReq});

    if(book.link === ""){
      alert("Please enter a valid Link");
    }
    else{
      //send link to backend
      console.log(book.link);
      
      const request = {
        link: book.link,
      }

      const res = await axios.post('http://localhost:5000/requestBook/acceptBookRequest/'+id, {
        method: 'POST',
        headers: {
          'token': localStorage.getItem('token'),
        },
        data: request,
      })
    }
  }

  async handleReject(id){
    const book = this.state.bookReq.find(book => book._id === id);
    book.status = "Rejected";
    this.setState({bookReq: this.state.bookReq});

    axios.put('http://localhost:5000/requestBook/rejectBookRequest/'+id, {
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then(response => {
        console.log(response.data);
      }
    )
      .catch(function(error){
        console.log(error);
      }
    );
  }

  async onChange(event, id){
    event.preventDefault();
    const book = this.state.bookReq.find(book => book._id === id);
    book.link = event.target.value;
    this.setState({bookReq: this.state.bookReq});
  }

  bookReqList(){
    return this.state.bookReq.map(currentReq => {
      if (currentReq.status === "Pending"){
        return <BookRequest book={currentReq} key={currentReq._id} onChange={this.onChange} handleAccept={this.handleAccept} handleReject={this.handleReject} />;
      };
    })
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
          <div style={{align: 'center'}}>
            {this.showBookReqList()}
          </div>
        </Container>
      </div>
    );
  }
}