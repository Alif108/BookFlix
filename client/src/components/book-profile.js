import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


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
        <div>
          {/* button to go to /books/edit */}
          <Link to={'/books/edit/'+this.state.book._id}>
            Edit
          </Link>
      </div>
      );
    }
  }


  renderReviews(){
      return (
        <div>
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
        </div>
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
      <div>
        <Row>
          <Col></Col>
          <Col>
            <img src= {"http://localhost:5000" + this.state.book.coverLocation} alt="" height='350px' width='250px'/>
            <div>
                <Link to={'/books/'+this.state.book._id+'/read'}>Read</Link>
            </div>
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
    );
  }
}