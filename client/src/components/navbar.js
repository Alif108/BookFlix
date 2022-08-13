/// Nav bar that changes based on logged in or not
/// if logged in it changes depending on the role of user

import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

import logout from "./LogOut";

export default class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      role: "",
      query: "",
      username: "",
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/navbar', {
      method: 'GET',
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then(res => {
        this.setState({loggedIn: true, role: res.data.role, username: res.data.username })
      })
      .catch(err =>{
        console.log('Error from navbar');
      });
}

handleClick(event)
{
  logout.LogOut();
}

render() {

  // navbar if user is logged in
  if (this.state.loggedIn) {
    
    // link to logout if user is logged in
  let logoutButton;
  logoutButton = <button onClick={this.handleClick}>Logout</button>;

  let link1, link2, link3, link4;
  let username = this.state.username;
  if (this.state.role === "Admin") {
    link1 = <Link to="/admin/stats" className="nav-link">Stats</Link>;
    link2 = <Link to="/admin/addbook" className="nav-link">Add Book</Link>;
    link3 = <Link to="/admin/managepacks" className="nav-link">Manage Packs</Link>;
    link4 = <Link to="/admin/requests" className="nav-link">Requests</Link>;
  } else {
    link1 = <Link to="/user/" className="nav-link">Home</Link>;
    link2 = <Link to="/books/" className="nav-link">Books</Link>;
    link3 = <Link to="/books/" className="nav-link">My List</Link>;
    link4 = "";
  } 
    
  return(
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
    <Link to="/" className="navbar-brand"><img src="http://localhost:5000/images/logo.png" alt="BOOKFLIX" height='40px' width='120px'/></Link>
    <div className="collpase navbar-collapse">
      <Container>
        <Row>
        <Col>
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
            {link1}
            </li>
            <li className="navbar-item">
            {link2}
            </li>
            <li className="navbar-item">
            {link3}
            </li>
            <li className="navbar-item">
            {link4}
            </li>
          </ul>
        </Col>
        <Col  style={{display:"flex",flexDirection: "row",justifyContent:"flex-end"}}>
          <Form class="form-inline my-2 my-lg-0" style={{display:"flex",flexDirection: "row"}}>
            <input class="form-control mr-sm-2" type="search" placeholder="Search by title, author or genre" aria-label="Search" onChange={event => this.setState({query: event.target.value})} value={this.state.query}/>
            <Button variant='btn btn-outline-warning my-2 my-sm-0' type="submit" onClick={this.searchBook}>Search</Button>
          </Form>
          
          <i class="text-white">{username}</i>
          <Button variant="outline-warning" onClick={this.handleClick}><img src="http://localhost:5000/images/bell.png" alt="notification" height='25px'/></Button>
          <Button variant="outline-primary" onClick={this.handleClick}><img src="http://localhost:5000/images/logout.png" alt="logout" height='25px'/></Button>
        </Col>
        </Row>
      </Container> 
    </div>
    </nav>

    );
    }
    else{
      return (null);
    }
  }
}