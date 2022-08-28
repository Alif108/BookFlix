import React, { Component }  from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Container } from "@mui/material";

const BookRequest = props => (
  <Container style={{display:"flex", backgroundColor:"#fff0cc", width:"50vw", height:"100", borderRadius:10, padding: 20, margin:20, marginLeft:"auto", marginRight:"auto"}} fixed>
  <Row style={{borderColor:"black", padding:20}} fluid>
    <Col style={{width:"80vw"}}>
      <b>Title:</b> { props.book.title }<br/>
      <b>Author:</b> { props.book.author }<br/>
      <b>Isbn:</b> { props.book.isbn }<br/>
      <b>Publisher:</b> { props.book.publisher }<br/>
      <b>Year:</b> { props.book.publishingYear }<br/>
      <b>Description:</b> { props.book.description }
    </Col>
    <Col style={{width:"20vw"}}>
      { props.book.status === "Accepted" ? <i style={{color:"green"}}><b>Accepted</b></i> : null} 
      { props.book.status === "Pending" ? <i style={{color:"orange"}}><b>Pending</b></i> : null} 
      { props.book.status === "Rejected" ? <i style={{color:"red"}}><b>Rejected</b></i> : null} 
      <br/><br/>
      {/* if status accepted go to book profile */}
      { props.book.status === "Accepted" ? <Button  variant="warning" width="100vw" onClick={() => props.handleView(props.book._id)}>View</Button> : null }
    </Col>

  </Row>
  <br/>
  </Container>
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
        <Container fluid>
          {this.bookReqList()}
        </Container>
      );
    }
  }

  render(){
    return (
      <Container style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"center"}} fluid>
        <br/>
        <Container style={{width:"50vw", margin:20}}>
          <Form class="form-inline my-2 my-lg-0" style={{display:"flex",flexDirection: "row", }}>
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