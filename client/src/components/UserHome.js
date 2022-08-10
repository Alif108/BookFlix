///Home page if logged in as admin
import React, { Component } from 'react';
import axios from 'axios';

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
  
    render() {
      const user = this.state.user;
      if(user)
        return (
            <div className="UserHome">
            <div className="container">
                <div className="user">
                <h3>
                    {user.username}  
                    </h3>
                </div>
                <div>
                    <a href='/books'>Books</a>
                </div>
                <div>
                    <a href='/packages'>Packages</a>
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