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
      <Container style={{ width:"200px", backgroundColor:"white", margin:20, padding:20 }}>

            { props.package.plan_name }<br/>
            { props.package.price }<br/>
            { props.package.duration }<br/>
            { props.package.max_books_limit } <br/>
          
      </Container>
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
          <Container fluid>
              <Package package={currentPackage} key={currentPackage._id}/>
              {this.admin_privilege(currentPackage)}
              {this.user_privilege(currentPackage)}
          </Container>
        );
      })
    }
  
    showPackageList(){
      if(this.state.packages.length > 0){
        return (
            <Row xs={1} md={5} className="g-4">
                {this.packageList()}
            </Row>
        );
      }
    }


    render() {
        return ( 
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