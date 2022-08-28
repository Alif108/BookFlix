/// Nav bar that changes based on logged in or not
/// if logged in it changes depending on the role of user

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';

import logout from "./LogOut";

export default class NavigationBar extends Component {
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
        this.setState({loggedIn: res.data.loggedIn, role: res.data.role, username: res.data.username })
      })
      .catch(err =>{
        console.log('Error from navbar' + err);
      });
}

handleClickLogout(event)
{
  logout.LogOut();
}

// renderHomeLogo() {
//   if(this.state.loggedIn) {
//     if(this.state.role === "Admin")
//       return <Link to="/admin" className="navbar-brand"><img src="http://localhost:5000/images/logo.png" alt="BOOKFLIX" height='40px' width='120px'/></Link>
//     else if(this.state.role === "Basic")
//       return <Link to="/user" className="navbar-brand"><img src="http://localhost:5000/images/logo.png" alt="BOOKFLIX" height='40px' width='120px'/></Link>
//   }
//   else
//     return <Link to="/" className="navbar-brand"><img src="http://localhost:5000/images/logo.png" alt="BOOKFLIX" height='40px' width='120px'/></Link>
// }
renderHomeLogo() {
  if(this.state.loggedIn){
    if(this.state.role === "Admin")
    {
      return(<Navbar.Brand href="/admin" style={{paddingLeft:'2vw',paddingRight:'2vw'}}>
      <img
        alt="BOOKFLIX"
        src="http://localhost:5000/images/logo.png"
        height="50px"
      />
    </Navbar.Brand>);
    }
    else if(this.state.role === "Basic")
    {
      return(
        <Navbar.Brand href="/user" style={{paddingLeft:'2vw',paddingRight:'2vw'}}>
          <img
            alt="BOOKFLIX"
            src="http://localhost:5000/images/logo.png"
            height="50px"
          />
        </Navbar.Brand>
      );
    }
  }
}

render() {

  // navbar if user is logged in
  if (this.state.loggedIn) {
    
    // link to logout if user is logged in
  let logoutButton;
  logoutButton = <button onClick={this.handleClickLogout}>Logout</button>;

  let link1, link2, link3, link4, link5;
  let username = this.state.username;
  if (this.state.role === "Admin") {
    link1 = <Link to="/books" className="nav-link">Books</Link>;
    link2 = <Link to="/admin/addbook" className="nav-link">Add Book</Link>;
    link3 = <Link to="/packages" className="nav-link">Manage Packs</Link>;
    link4 = <Link to="/requestBook/requests" className="nav-link">Requests</Link>;	
    link5 = <Link to="/admin/addAuthor" className="nav-link">Add Author</Link>;
  } else {	
    link1 = <Link to="/books/" className="nav-link">Books</Link>;	
    link2 = <Link to="/books/user/getMyList/" className="nav-link">My List</Link>;	
    link3 = <Link to="/requestBook/" className="nav-link">Request a Book</Link>;
    link4 = <Link to="/requestBook/myrequests" className="nav-link">My Requests</Link>;
    link5 = <Link to="/authors" className="nav-link">Author</Link>;
  }
    
  return(


      <Navbar bg="dark" variant="dark" style={{height:"70px"}}>
    
        
        <Container fluid>
          {this.renderHomeLogo()}

          <Nav className="me-auto">


          <Nav.Link style={{whiteSpace:'nowrap'}}>{link1}</Nav.Link>
          <Nav.Link style={{whiteSpace:'nowrap'}}>{link2}</Nav.Link>
          <Nav.Link style={{whiteSpace:'nowrap'}}>{link3}</Nav.Link>
          <Nav.Link style={{whiteSpace:'nowrap'}}>{link4}</Nav.Link>
          <Nav.Link style={{whiteSpace:'nowrap'}}>{link5}</Nav.Link>

          </Nav>

          <Container style={{display:"flex", alignItems: "center"}}>
            {/*
            
            <Container>
              <Form class="form-inline my-2 my-lg-0" style={{display:"flex",flexDirection: "row", }}>
              <input class="form-control mr-sm-2" type="search" placeholder="Search by title, author or genre" aria-label="Search" onChange={event => this.setState({query: event.target.value})} value={this.state.query}/>
              <Button variant='btn btn-outline-warning my-2 my-sm-0' type="submit" onClick={this.searchBook}>Search</Button>
              </Form>
            </Container>
            */}
            
            <NavDropdown title={username} id="basic-nav-dropdown" menuVariant="dark" align="end" style={{color: "white" , marginLeft: "auto", paddingRight:20}}>
              <NavDropdown.Item href="/user/profile">View Profile</NavDropdown.Item>
              <NavDropdown.Item href="#">Settings</NavDropdown.Item>
              <NavDropdown.Item href="/packages/myPackage">My Package</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.handleClickLogout} style={{color: "#ff7700"}}>Logout</NavDropdown.Item>
            </NavDropdown>



            <Dropdown variant="dark" align="end">
              <Dropdown.Toggle id="dropdown-button-drop-start" variant="dark" style={{ width:60, margin:0, paddingRight:20}}>
              <img src="http://localhost:5000/images/bell.png" alt="notification" height='25px'/>     
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <i style={{margin:10, color:'grey'}}>Notifications</i>
                <hr/>
                <Dropdown.Item href="#"><img src="http://localhost:5000/images/bell.png" alt="notification" height='25px'/>  Action sjbhfgsh sfgjbsjfg<br/> sfgbjsgfjs sfgsufghju</Dropdown.Item>
                <hr/>
                <Dropdown.Item href="#">Another action</Dropdown.Item>
                <hr/>
                <Dropdown.Item href="#">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {/*
            <Container>
            <Button variant="outline-primary" onClick={this.handleClickLogout}><img src="http://localhost:5000/images/logout.png" alt="logout" height='25px'/></Button>
            </Container>
            */}
            </Container>
        </Container>
      </Navbar>

    );
    }
    else{
      return (null);
    }
  }
}