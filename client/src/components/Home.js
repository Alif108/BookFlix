
import React, { Component } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const backdrop = {
  display:"flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent:"center",
  backgroundImage: 'url("http://localhost:5000/images/backdrop.png")',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  width: '100vw',
  height: '100vh',
};



class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {user:""};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/home', {
      method: 'GET',
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then(res => {
        this.setState({user: res.data.user})
      })
      .catch(err =>{
        console.log('Error from Home');
      });
  }


  render() {

    const user = this.state.user;
    const role = this.state.user.role;
    console.log(user);
    console.log(role);

    if (role === "Admin" ) {
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
    }
    else if (this.state.role === "Basic" ) {
      return (
        <div className="UserHome">
          <br/><br/>
          <div className="container">
              <div style={{display:"flex",alignItems: "center",justifyContent:"center"}}> 
                <ControlledCarousel />
              </div>
                <br/><br/>
              <div>
                
              </div>
          </div>
        </div>
      );
    }
    else{
      console.log("else");
      return (
        <div style={backdrop}>
          <img src="http://localhost:5000/images/logo.png" alt='BOOKFLIX' height={"80vh"}></img>
          <br/>
          <h3><b>Unlimited books, anywhere, anytime</b></h3>
          <p>All of BOOKFLIX for just $0.99</p><br/>
  
          <div className="d-grid gap-2 col-2 mx-auto">
            <Button variant="warning" width='10vw' href="/login/">Login</Button>
            <Button variant="warning" width='10vw' href="/register/">Register</Button>
          </div>
        </div>
      );
    }
  }
}

export default Home