///Home page if logged in as admin
import React, { Component }  from "react";
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/esm/Container";
import axios from 'axios';





class StatsFinance extends Component {
    
    constructor(props){
        super(props);
    
        this.state = {
            user: "",
            finance: [],
        };
      }
    
      async componentDidMount(){
        axios.get('http://localhost:5000/stats/finance/', {
          method: 'GET',
          headers: {
            'token': localStorage.getItem('token'),
          },
        })
          .then(response => {
            this.setState({
                user: response.data.user,
                finance: response.data.finance,
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
        <Container style={{display: "flex", flexDirection: "row",  height:'calc(100vh - 70px)', padding:0}} fluid>
          <Container style={{ flex: 1,  flexDirection: "column", backgroundColor: "orange", padding: '3vh'}} >

          <Link style={{textDecoration:"none", color:"white",fontSize:20, padding:"5px 20px 5px 20px",}} to='/admin/stats/popularity/'>
            Popularity
          </Link>
          <br />
          <Link style={{textDecoration:"none", color:"white",fontSize:20, padding:"5px 20px 5px 20px",  borderRadius:50, backgroundColor:"black" }} to='/admin/stats/finance/'>
            Finance
          </Link>

          </Container>
          <Container style={{ flex: 6, backgroundColor: "#fff0cc" , padding: '5vh'}} >


            <h3>
                Stats ofFinance
            </h3>
            
          </Container>

        </Container>


        );
    }
  }
  
  export default StatsFinance;