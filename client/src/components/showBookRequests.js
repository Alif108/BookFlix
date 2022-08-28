import React, { Component }  from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Container } from "@mui/material";

const BookRequest = props => (
  <Container style={{display:"flex", backgroundColor:"#fff0cc", width:"50vw", height:"100", borderRadius:10, padding: 20, margin:20, marginLeft:"auto", marginRight:"auto"}} onClick={() => window.location.href = '/books/'+props.book._id} fixed>
  <Row style={{borderColor:"black", padding:20}} fluid>
    <Col style={{width:"60vw"}}>
      <b>{ props.book.title }</b><br/>
      Author: { props.book.author }<br/>
      Isbn: { props.book.isbn }<br/>
      Publisher: { props.book.publisher }<br/>
      Year: { props.book.publishingYear }<br/>
      Description:{ props.book.description }
    </Col>
    <Col style={{width:"40vw"}}>
      Add Id of book: <br/>
      <input type="text" name="link" style={{width:"15vw"}} value={ props.book.link } onChange={ (e) => { props.onChange(e, props.book._id) } } />
      <br/><br/><br/>
      <Button variant='success' style={{marginLeft:"3vw", marginRight:10}} onClick={() => props.handleAccept(props.book._id)}>Accept</Button>
      <Button variant='danger' style={{marginRight:10}} onClick={() => props.handleReject(props.book._id)}>Reject</Button>
    </Col>
  </Row>
  </Container>
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



      <Container style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"center"}} fluid>
        <br/>
        <Container style={{width:"50vw", margin:20}}>
          <Form class="form-inline my-2 my-lg-0" style={{display:"flex",flexDirection: "row"}}>
          <input class="form-control mr-sm-2" type="search" placeholder="Search by Title or Author" aria-label="Search" onChange={event => this.setState({query: event.target.value})} value={this.state.query}/>
          <Button variant='btn btn-warning my-2 my-sm-0' type="submit" onClick={this.searchBookRequest}>Search</Button>
          </Form>
        </Container>
        <br/>
        {this.showBookReqList()}
      </Container>

    );
  }
}