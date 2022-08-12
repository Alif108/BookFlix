///Home page if logged in as admin
import React, { Component } from 'react';
import axios from 'axios';

class adminHome extends Component {
    constructor(props) {
      super(props);
      this.state = {user:""};
    }
  
    componentDidMount() {
  
      axios.get('http://localhost:5000/admin', {
        method: 'GET',
        headers: {
          'token': localStorage.getItem('token'),
        },
      })
        .then(res => {
          this.setState({user: res.data.user})
        })
        .catch(err =>{
          console.log('Error from adminHome');
        });
  }
  
    render() {
      const user = this.state.user;
      console.log(user);
      if(user)
        return (
            <div className="adminHome">
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
                    <a href='/admin/addBook'>Add Book</a><br></br>
                    <a href='/admin/userlist'>List of Users</a><br></br>
                    <a href='/books'>Books</a>
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
  
  export default adminHome;