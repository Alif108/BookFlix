import React, { Component }  from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Container } from "@mui/material";

const Book = props => (
  <Col>
  <Container style={{backgroundColor:"#fff0cc", width:"50vw", height:"100", borderRadius:10, padding: 20}} onClick={() => window.location.href = '/books/'+props.book._id} fixed>
    <Row>
      <Col xs={1}  style={{width: "200px"}}>
        <Row>
          <img src= { 'http://localhost:5000'+props.book.coverLocation } style={{height:210, width:165}}/>
        </Row>
      </Col>
      <Col xs={8} style={{margin:0, paading:0}} fluid>
      <Typography style={{fontSize:32, fontFamily:'Roboto'}}>{props.book.title}</Typography>
      <Typography style={{fontSize:18, color:"red", fontFamily:'Roboto'}}>{props.book.author}</Typography>
      <Typography style={{fontSize:14, color:"brown", fontFamily:'Roboto'}}>{props.book.genre.name}</Typography>
      <Typography class="text-truncate" style={{fontSize:14, fontFamily:'Roboto'}}>{props.book.description}</Typography>
              
      </Col>
    </Row>
  </Container>
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
        <Container>
            <Book book={currentbook} key={currentbook._id}/>
              <Container style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
              <Link className='btn btn-danger' to={"/books/removeMyList/" + currentbook._id}>
                Remove From List
              </Link>
            </Container>
        </Container>
      );
    })
  }

  showBookList(){
    if(this.state.books.length > 0){
      return (
        <div>
          <Row xs={1} md={1} className="g-4">
              {this.bookList()}
          </Row>
        </div>
      );
    }
  }

  render(){
    return (
      <Container style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"center", padding:10}}>
        {this.showBookList()}
      </Container>
    );
  }
}