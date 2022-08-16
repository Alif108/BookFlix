import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Container from 'react-bootstrap/esm/Container';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

const NavbarHeight = '60px';

export default class Book extends Component{
  
  constructor(props){
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.calc_rating = this.calc_rating.bind(this);
    this.addReview = this.addReview.bind(this);

    this.state = {
      imgg: '',
      book: [],
      user: [],
      reviews: [],
      avg_rating: 0,
      description: '',
      rating: 0,
      id: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1],
    };
  }

  componentDidMount(){
    axios.get('http://localhost:5000/books/'+this.state.id, {
      method: 'GET',
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then(response => {  
        this.setState({
          user: response.data.user,
          book: response.data.book,
        });
      })
      .catch(function(error){
        console.log(error);
      }
    );
    
    axios.get('http://localhost:5000/books/reviews/'+this.state.id, {
      method: 'GET',
      headers: {
        'token': localStorage.getItem('token'),
      },
    }).then(response => {
      console.log(response.data);
      this.setState({
        reviews: response.data,

      });
      this.calc_rating();
    })
    .catch(function(error){
      console.log(error);
    });
  }


  calc_rating(){
    let sum = 0;
    for (let i = 0; i < this.state.reviews.length; i++) {
      sum += this.state.reviews[i].rating;
    }
    this.setState({
      avg_rating: sum / this.state.reviews.length,
    });
  }

  editBookPage() {
    let path = 'http://localhost:5000/books/edit/' + this.state.book._id;
    Navigate(path); 
  }

  async addReview(e) {
    e.preventDefault();
    const review = {
      bookID: this.state.book._id,
      userID: this.state.user.id,
      rating: this.state.rating,
      description: this.state.description,
      timestamp: new Date(),
    };
    console.log(this.state.user.id);
    await axios.post('http://localhost:5000/books/addReview', review, {
      method: 'POST',
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then(response => {
        console.log(response);
        window.location.reload();
      }).catch(function(error){
        console.log(error);
      }
    );
  }
  
  onChangeRating(e) {
    this.setState({
      rating: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  renderEditButton(){
    if (this.state.user.role === "Admin") {
      return (
        <Container>
          {/* button to go to /books/edit */}
          <Link className='btn btn-danger' to={'/books/edit/'+this.state.book._id}>
            Edit Book
          </Link>
        </Container>
      );
    }
  }


  renderReviews(){
      return (
        <Container>
          <h3>Reviews</h3>
          {this.state.reviews.map((review) => {
            return (
              <Row>
                <Col>
                  <h5>Rating: {review.rating}</h5>
                  <h5>Description: {review.description}</h5>
                </Col>
              </Row>
            );
          }
          )}
        </Container>
      );
  }


  renderReviewBox(){
    if (this.state.user.role === "Basic") {
      return (
        <div>
          <Form.Label column="sm" lg={2}>Rating:</Form.Label>
          <Form.Control className="w-100" size="sm" as="select" onChange={this.onChangeRating} value={this.state.rating}>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>

          <Form.Label column="sm" lg={2}>Write review:</Form.Label>
          <Form.Control className="w-100" size="sm" as="textarea" onChange={this.onChangeDescription} value={this.state.description} placeholder="" />
          
          <Button className="float-end" size="sm" variant="info" onClick={this.addReview}>Save</Button>
        </div>
      );
    }
  }

  render(){
    return (

      <Container style={{display: "flex", flexDirection:"row", backgroundColor:"#fff0cc", height:'calc(100vh - 70px)'}} fluid>
        <Container style={{flex:2 , display:"flex", flexDirection:"column", alignItems: "center", justifyContent:"center", backgroundColor:"#ffe3a1", margin:"20px"}} fluid>
          <img src= {"http://localhost:5000" + this.state.book.coverLocation} alt="" height='85%' margin='20px'/>
           <br />
          {this.renderEditButton()}
        </Container>
        <Container style={{flex:3 , display:"flex", flexDirection:"column", marginTop:20, marginBottom:20}} fluid>
          <Container style={{backgroundColor:"#ffe3a1", borderRadius:5, margin:5, padding:20}} fluid>
            <Typography style={{fontSize:40, fontFamily:'Roboto'}}>{this.state.book.title}</Typography>
            <Typography style={{fontSize:16, color:"brown", margin:5}}><b>{this.state.book.author}</b></Typography>

            
          </Container>
          <Container style={{backgroundColor:"#dedede", borderRadius:5, margin:5, padding:5, paddingLeft:20}} fluid>
            <Rating name="read-only" value={this.state.book.rating} size="large" readOnly />
          </Container>
          <Container style={{backgroundColor:"#ffe3a1", borderRadius:5, margin:5, padding:20}} fluid>
            <Typography style={{fontSize:14, fontFamily:'Roboto'}}>{this.state.book.description}</Typography>
          </Container>
          <Container style={{display:"flex", flexDirection:"row", backgroundColor:"#dedede", borderRadius:5, margin:5, padding:5, paddingLeft:20}} fluid>
            <Typography style={{color:"white", backgroundColor:"grey", borderRadius:20, margin:5, padding:5, paddingLeft:10, paddingRight:10}}>
              Category
            </Typography>
          </Container>
          <Container style={{backgroundColor:"#ffe3a1", borderRadius:5, margin:5, padding:20}} fluid>
            {this.renderReviewBox}
          </Container>


        </Container>

      </Container>



/*
    
      <div>
        <Row>
          <Col></Col>
          <Col>
            <img src= {"http://localhost:5000" + this.state.book.coverLocation} alt="" height='350px' width='250px'/>
            { this.renderEditButton() }
          </Col>
          <Col>
            <h1>{this.state.book.title} </h1>
            <h3> {this.state.avg_rating.toFixed(1)}/5</h3>
            <h3>{this.state.book.author}</h3>
            <h5>{this.state.book.genre}</h5>
            <p>{this.state.book.description}</p>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
          <div>
            <h3>Reviews</h3>
            {this.state.reviews.map((review) => {
              return (
                <Row>
                  <Col>
                    <h5>User: {review.userID.username}</h5>
                    <h5>Rating: {review.rating}</h5>
                    <h5>Description: {review.description}</h5>
                  </Col>
                </Row>
              );
            }
            )} 
          </div>
          <div >
            { this.renderReviewBox() }
          </div>
          </Col>
          <Col></Col>
        </Row>
      </div>


          */
    );
  }
}