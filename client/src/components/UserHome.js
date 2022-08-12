///Home page if logged in as admin
import React, { Component } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} style={{width: '50vw'}}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="http://localhost:5000/images/c1.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="http://localhost:5000/images/c2.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="http://localhost:5000/images/c3.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

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
      let role = this.state.user.role;
      if(role === "Basic")
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
        else
            return(
                <div>
                    <h1>Error</h1>
                </div>
            );
    }
  }
  
  export default UserHome;