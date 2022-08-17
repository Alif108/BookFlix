///Home page if logged in as admin
import React, { Component }  from "react";
import NavigationBar from "./navbar";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/esm/Container";
import axios from 'axios';



const Package = props => (
    <Col>
      <div>
        <Card style={{ width: '15rem' }}>
          <Card.Body>
            <Card.Title>{ props.package.plan_name }</Card.Title>
            <Card.Title>{ props.package.price }</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{ props.package.duration } Days</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">{ props.package.max_books_limit } Books</Card.Subtitle>
          </Card.Body>
        </Card>
      </div>
    </Col>
  )




class AdminManagePacks extends Component {
    
    constructor(props){
        super(props);
    
        this.state = {
            user: "",
          packages: [],
        };
      }
    
      async componentDidMount(){
        axios.get('http://localhost:5000/packages/', {
          method: 'GET',
          headers: {
            'token': localStorage.getItem('token'),
          },
        })
          .then(response => {
            this.setState({
                user: response.data.user,
                packages: response.data.packages,
            });
          })
          .catch(function(error){
            console.log(error);
          }
        );
      }

      admin_privilege(currentPackage)
      {
          if(this.state.user.role === "Admin")
              return (
              <div>
                  <Link to={"/admin/editPackage/"+currentPackage._id} className="nav-link" >Edit</Link>
                  <Link to={"/admin/removePackage/"+currentPackage._id} className="nav-link" >Remove</Link>
              </div>
              );
      }
  
      user_privilege(currentPackage)
      {
          if(this.state.user.role === "Basic")
              return (
              <div>
                  <Link to={"/packages/getPackage/"+currentPackage._id} className="nav-link" >Get Package</Link>
              </div>
              );
      }
  
    packageList(){
      return this.state.packages.map(currentPackage => {
        return (
          <div>
              <Package package={currentPackage} key={currentPackage._id}/>
              {this.admin_privilege(currentPackage)}
              {this.user_privilege(currentPackage)}
          </div>
        );
      })
    }
  
    showPackageList(){
      if(this.state.packages.length > 0){
        return (
          <div>
            <Row xs={1} md={5} className="g-4">
                {this.packageList()}
            </Row>
          </div>
        );
      }
    }


    render() {
        return ( 
    /*    <Container style={{padding:0, margin:0}} fluid>
        <NavigationBar />

     */   
        <Container style={{display: "flex", flexDirection: "row", height:'calc(100vh - 70px)', padding:0}} fluid> 
          <Container style={{ flex: 1,  flexDirection: "column", backgroundColor: "orange", padding: '3vh'}} >

          <Link style={{textDecoration:"none", color:"white",fontSize:20}} to='/admin/addpackage'>
          Add New Package
          </Link>
          <br />
          <Link style={{textDecoration:"none", color:"white",fontSize:20}} to='/packages'>
          Packages
          </Link>

          </Container>
          <Container style={{ flex: 6, backgroundColor: "#fff0cc" , padding: '5vh'}} >


            {this.showPackageList()}

          </Container>

        </Container>


        );
    }
  }
  
  export default AdminManagePacks;