import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { Container } from "@mui/material";

const ContinueItem = props => (
  <Container onClick={() => window.location.href = '/books/'+props.item._id+"/read"}  style={{width:200, margin:0, padding:0}}>
    <img src= { 'http://localhost:5000'+props.item.coverLocation } style={{height:180, width:120}}/>
  </Container>
)

const PopularItem = props => (
  <Container onClick={() => window.location.href = '/books/'+props.item._id+"/read"}  style={{width:200, margin:0, padding:0}}>
    <img src= { 'http://localhost:5000'+props.item.coverLocation } style={{height:180, width:120}}/>
  </Container>
)

const NewItem = props => (
  <Container onClick={() => window.location.href = '/books/'+props.item._id+"/read"}  style={{width:200, margin:0, padding:0}}>
    <img src= { 'http://localhost:5000'+props.item.coverLocation } style={{height:180, width:120}}/>
  </Container>
)

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
    this.state = {
      user:"",
      continueReadingItems: [],
      popularItems: [],
      newItems: [],
    };
  }

  componentDidMount() {

    //get user info
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

    //get continue reading items
    axios.get('http://localhost:5000/read/getUserReadItems', {
      method: 'GET',
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then(res => {
        this.setState({continueReadingItems: res.data})
      })
      .catch(err =>{
        console.log('Error from UserHome');
      });

    //get popular items
    console.log("fetching popular items");
    this.loadPopularItems();

    //get new items
    console.log("fetching new items");
    this.loadNewItems();
    
  }

  loadPopularItems = async () =>{
    const books = await axios.get('http://localhost:5000/read/getPopularItems', {
      method: 'GET',
      headers: {
        'token': localStorage.getItem('token'),
      },
    })

    console.log(books.data);
    this.setState({popularItems: books.data})
  }

  loadNewItems = async () =>{
    const books = await axios.get('http://localhost:5000/read/getNewItems', {
      method: 'GET',
      headers: {
        'token': localStorage.getItem('token'),
      },
    })

    console.log(books.data);
    this.setState({newItems: books.data})
  }

  contReadingItems(){
    return this.state.continueReadingItems.map(item => {
      return <ContinueItem item={item.bookID} key={item.bookID._id}/>;
    });
  }
  
  showContinueReadingItems() {
    if(this.state.continueReadingItems.length > 0){
      return (
        <Container style={{display:"flex", flexDirection:"row", padding:10, alignContent:"flex-start"}}>
          {this.contReadingItems()}
        </Container>
      );
    }
  }

  popularItems() {
    return this.state.popularItems.map(item => {
      return <PopularItem item={item} key={item._id}/>;
    });
  }

  showPopularItems() {
    if(this.state.popularItems.length > 0){
      return (
        <Container  style={{display:"flex", flexDirection:"row", padding:10, alignContent:"flex-start"}} fluid>
          {this.popularItems()}
        </Container>
      );
    }
  }

  newItems() {
    return this.state.newItems.map(item => {
      return <NewItem item={item} key={item._id}/>;
    });
  }

  showNewItems() {
    if(this.state.newItems.length > 0){
      return (
        <Container style={{display:"flex", flexDirection:"row", padding:10, flexFlow:"row nowrap"}} fluid>
          {this.newItems()}
        </Container>
      );
    }
  }

  render() {
    const user = this.state.user;
    let role = this.state.user.role;
    if(role === "Basic")
      return (
          <div className="UserHome" style={{backgroundColor:"#fff0cc"}}>
            <br/><br/>
            <div className="container">
                {/* <div style={{display:"flex",alignItems: "center",justifyContent:"center"}}> 
                  <ControlledCarousel />
                </div> */}
                <br/><br/>
                <div>
                    <h5><i style={{color:"grey"}}>Continue Reading</i></h5>
                    {this.showContinueReadingItems()}
                </div>
                <div>
                    <h5><i style={{color:"grey"}}>Popular Now</i></h5>
                    {this.showPopularItems()}
                </div>
                <div>
                    <h5><i style={{color:"grey"}}>New Items</i></h5>
                    {this.showNewItems()}
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