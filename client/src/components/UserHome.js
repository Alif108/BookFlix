///Home page if logged in as admin
import React, { Component } from 'react';
import axios from 'axios';

import logout from "./LogOut";

class UserHome extends Component {
    constructor(props) {
      super(props);
      this.state = {user:""};
    }
  
    componentDidMount() {
  
      axios.get('http://localhost:5000/user', {
        method: 'GET',
        headers: {
          'token': localStorage.getItem('token'),
        },
      })
        .then(res => {
          this.setState({user: res.data.user})
        })
        .catch(err =>{
          console.log('Error from UserHome');
        });
  }

  handleClick(event)
  {
    logout.LogOut();
  }
  
    render() {
      const user = this.state.user;
      if(user)
        return (
            <div className="UserHome">
            <div className="container">
                <div>
                    <h1>
                        BookFlix
                    </h1>
                </div>
                <div className="user">
                <h3>
                    {user.username}  
                    </h3>
                </div>
                <div>
                    {/* <a href='/admin/addBook'>Add Book</a><br></br>
                    <a href='/admin/userlist'>List of Users</a> */}
                    {/* List of Books <br></br> */}
                    <a href='/books'>Books</a>
                </div>
                <div>
                    <button onClick={this.handleClick}>Logout</button>
                </div>
            </div>
            </div>
        );
        else
            return(
                <div>
                    <h1>Error</h1>
                </div>
            );
    }
  }
  
  export default UserHome;