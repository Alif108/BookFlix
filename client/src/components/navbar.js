/// Nav bar that changes based on logged in or not
/// if logged in it changes depending on the role of user

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      role: "",
    };
  }

//   componentDidMount() {
  
//     axios.get('http://localhost:5000/navbar', {
//       method: 'GET',
//       headers: {
//         'token': localStorage.getItem('token'),
//       },
//     })
//       .then(res => {
//         this.setState({user: res.data.user})
//       })
//       .catch(err =>{
//         console.log('Error from adminHome');
//       });
// }

  render() {
    if (this.state.loggedIn === true){
      if(this.state.role === "Admin"){
        return (
          <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to="/" className="navbar-brand">BookFlix</Link>
            <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
              <Link to="/books/" className="nav-link">books</Link>
              </li>
              <li className="navbar-item">
              <Link to="/admin/addbook" className="nav-link">Add Book</Link>
              </li>
            </ul>
            </div>
          </nav>
        );
      }
    }
  }
}