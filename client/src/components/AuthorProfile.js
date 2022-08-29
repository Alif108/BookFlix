import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { Container } from "@mui/material";
import Typography from '@mui/material/Typography';
import Card from 'react-bootstrap/Card';

const Author = props => (
      <div style={{width:"50vw", height:"320", backgroundColor:"white", borderRadius:20}}>
        <Row style={{padding:0}}>
            <Col xs={3} style={{width:"200px", margin:20}}>
                  <img src= { 'http://localhost:5000'+props.author.photoLocation } style={{height:280, width:200}}/>
            </Col>
            <Col style={{margin:30}}>
            
            <Typography style={{fontSize:36, fontFamily:'fantasy'}}><b>{ props.author.name }</b></Typography>
            <Typography style={{fontSize:16, color:"grey", margin:5, overflowY:"scroll"}}><i>{ props.author.description }</i></Typography>
            </Col>
        </Row>
      </div>
  )

  const Book = props => (
    <Container onClick={() => window.location.href = '/books/'+props.book._id+"/read"}  style={{width:200, margin:0, padding:0}}>
    <img src= { 'http://localhost:5000'+props.book.coverLocation } style={{height:180, width:120}}/>
  </Container>
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
        <Container style={{display:"flex", flexDirection:"row", padding:10, flexFlow:"row nowrap"}} fluid>
          
          {this.bookList()}
        </Container>
      );
    }
  }

  render(){
    return (
      <div style={{display: "flex", flexDirection: "column", backgroundColor:"#fff0cc",minHeight:'calc(100vh - 70px)', alignItems: "center", justifyContent:"center"}}>
        <br />
        { this.renderAuthorProfile() }
        <hr /><br />
        <i style={{color:"grey"}}>Books by this author</i>
        <div>
        <br />
        { this.renderBookList() }
        </div>
      </div>
    );
  }
}