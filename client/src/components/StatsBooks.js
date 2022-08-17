///Home page if logged in as admin
import React, { Component }  from "react";
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/esm/Container";
import axios from 'axios';





class StatsBooks extends Component {
    
    constructor(props){
        super(props);
    
        this.state = {
            user: "",
            books: [],
        };
      }
    
      async componentDidMount(){
        axios.get('http://localhost:5000/stats/books/', {
          method: 'GET',
          headers: {
            'token': localStorage.getItem('token'),
          },
        })
          .then(response => {
            this.setState({
                user: response.data.user,
                books: response.data.books,
            });
          })
          .catch(function(error){
            console.log(error);
          }
        );
      }




    render() {
        return ( 
    /*    <Container style={{padding:0, margin:0}} fluid>
        <NavigationBar />

     */   
        <Container style={{display: "flex", flexDirection: "row", height:'100vh', padding:0}} fluid> 
          <Container style={{ flex: 1,  flexDirection: "column", backgroundColor: "orange", padding: '3vh'}} >

          <Link style={{textDecoration:"none", color:"white",fontSize:20}} to='/admin/stats/books/'>
            Books
          </Link>
          <br />
          <Link style={{textDecoration:"none", color:"white",fontSize:20}} to='/admin/stats/users/'>
            Users
          </Link>
          <br />
          <Link style={{textDecoration:"none", color:"white",fontSize:20}} to='/admin/stats/finance/'>
            Finance
          </Link>

          </Container>
          <Container style={{ flex: 6, backgroundColor: "#fff0cc" , padding: '5vh'}} >

            <h3>
                Stats of Books
            </h3>

          </Container>

        </Container>


        );
    }
  }
  
  export default StatsBooks;