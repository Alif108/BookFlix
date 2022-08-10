/// Nav bar that changes based on logged in or not
/// if logged in it changes depending on the role of user

import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import axios from "axios";

import logout from "./LogOut";

export default class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      role: "",
      query: "",
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
        this.setState({loggedIn: true, role: res.data.role})
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

  // link to addBook page if user is admin
  let addBookLink, managePacksLink;
  if (this.state.role === "Admin") 
  {
    addBookLink = <Link to="/admin/addbook" className="nav-link">Add Book</Link>;
    managePacksLink = <Link to="/admin/managePacks" className="nav-link"> Manage Packs </Link>;
  } 
  else {
    addBookLink = "";
    managePacksLink = "";
  }

  // link to logout if user is logged in
  let logoutButton;
  logoutButton = <button onClick={this.handleClick}>Logout</button>;

  // navbar if user is logged in
  if (this.state.loggedIn === true){
      return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <Link to="/" className="navbar-brand">BookFlix</Link>
          <div className="collpase navbar-collapse">
          
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/books/" className="nav-link">books</Link>
            </li>
            
            <li className="navbar-item">
              {addBookLink}
            </li>

            <li className="navbar-item">
              {managePacksLink}
            </li>
            
            <li className="navbar-item">
            {logoutButton}
            </li>
          
          </ul>
          </div>
        </nav>
      );
    }

  // navbar if user is not logged in
  else
  {
      return (
          <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to="/" className="navbar-brand">BookFlix</Link>
          <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/register/" className="nav-link">Register</Link>
            </li>
            <li className="navbar-item">
              <Link to="/login/" className="nav-link">Login</Link>
            </li>
          </ul>
          </div>
        </nav>
      );
  }
  }
}