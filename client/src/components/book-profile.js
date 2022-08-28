import React, { Component } from 'react';
import { MouseEvent } from 'react';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import axios from 'axios';
import Container from 'react-bootstrap/esm/Container';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { Grid } from '@mui/material';

const NavbarHeight = '60px';
/*
const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
const open = Boolean(anchorEl);
const id = open ? 'simple-popover' : undefined;
*/

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default class Book extends Component{
  constructor(props){
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.calc_rating = this.calc_rating.bind(this);
    this.addReview = this.addReview.bind(this);
    this.addToMyList = this.addToMyList.bind(this);
    this.setReadItem = this.setReadItem.bind(this);

    this.state = {
      imgg: '',
      book: [],
      user: [],
      reviews: [],
      avg_rating: 0,
      description: '',
      rating: 0,
      id: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1],
      genre: "",
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
          genre: response.data.genre.name,
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



  /*
//rating popover


  handleClick(e) {
    setAnchorEl(e.currentTarget);
  };

  handleClose(){
    setAnchorEl(null);
  };


*/



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

  addToMyList(e){
    const user = {userID: this.state.user.id};
    axios.post('http://localhost:5000/books/addToMyList/'+this.state.id, user, {
      method: 'POST',
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then(response => {  
        window.alert(response.data.message);
      })
      .catch(function(error){
        console.log(error);
      }
    );
  }

  renderEditButton(){
    if (this.state.user.role === "Admin") {
      return (
        <Container style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
          <Link className='btn btn-danger' to={'/books/edit/'+this.state.book._id}>
            Edit Book
          </Link>
        </Container>
      );
    }
  }

  renderMyListButton(){
    if(this.state.user.role === "Basic" && this.state.user.subscription){
      return (
        <Container>
          <Button className="float-end" size="sm" variant="info" onClick={this.addToMyList}>Add to My List</Button>
        </Container>
      );
    }
  }

  renderReadButton()
  {
    if(this.state.user.role === "Basic" && this.state.user.subscription){
      return (
        <Container style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
          <Button variant='btn btn-danger' onClick={this.setReadItem}>Read</Button>
        </Container>
      );
    }
  }

  setReadItem = async() =>{
    const response = await fetch('http://localhost:5000/read/setReadItem/'+this.state.id, {
      method: 'GET',
      headers: {
        'token': localStorage.getItem('token'),
      }, 
    });

    console.log(response);

    window.location.href = '/books/' + this.state.book._id+ '/read' ;
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
    if (this.state.user.role === "Basic" && this.state.user.subscription) {
      return (
        <Container style={{width:"50vw"}}fixed>
          <Rating name="simple-controlled" size="large" value={this.state.rating} onChange={this.onChangeRating} />
          <Form.Control className="w-100" size="sm" as="textarea" onChange={this.onChangeDescription} value={this.state.description} placeholder="" />
          <Button className="float-end" size="sm" variant="warning" style={{width:"150px", color:"brown"}} onClick={this.addReview}>Save</Button>
          <br/><br/>
        </Container>
      );
    }
  }

  render(){
    return (
      <Container style={{display: "flex", flexDirection:"row", backgroundColor:"#fff0cc", height:'calc(100vh - 70px)'}} fluid>
        <Container style={{flex:2 , display:"flex", flexDirection:"column", alignItems: "center", justifyContent:"center", backgroundColor:"#ffe3a1", margin:"20px"}} fluid>
          <img src= {"http://localhost:5000" + this.state.book.coverLocation} alt="" height='85%' width='60%' margin='20px'/>
          <br />
          { this.renderReadButton() }
          { this.renderEditButton() }
        </Container>

        <Container style={{flex:3 , display:"flex", flexDirection:"column", marginTop:20, marginBottom:20}} fluid>
          <Container style={{backgroundColor:"#ffe3a1", height:"15vh", borderRadius:5, margin:5, padding:20}} fluid>
            <Grid container spacing={0}>
              <Grid xs={11}>
                <Typography style={{fontSize:36, fontFamily:'fantasy'}}>{this.state.book.title}</Typography>
                <Typography style={{fontSize:16, color:"brown", margin:5}}><b>{this.state.book.author}</b></Typography>
              </Grid>
              <Grid xs={1}>
                <Checkbox className="float-end" {...label} onClick={this.addToMyList} icon={<BookmarkBorderIcon />} checkedIcon={<BookmarkIcon />} />
              </Grid>
            </Grid>
          </Container>


          <Container style={{backgroundColor:"#dedede", borderRadius:5, margin:5, padding:5, paddingLeft:20}} fluid>
            <Rating name="read-only" value={this.state.avg_rating} precision={0.1} size="large" readOnly />
          </Container>


          <Container style={{height:"30vh", overflow:"scroll", backgroundColor:"#ffe3a1", borderRadius:5, margin:5, padding:20}} fixed>
            <Typography style={{fontSize:14, fontFamily:'fantasy'}}>{this.state.book.description}</Typography>
          </Container>


          <Container style={{display:"flex", flexDirection:"row", backgroundColor:"#dedede", borderRadius:5, margin:5, padding:5, paddingLeft:20}} fluid>
            <Typography style={{color:"white", backgroundColor:"grey", borderRadius:20, margin:5, padding:5, paddingLeft:10, paddingRight:10}}>
              Category
            </Typography>


            <Typography style={{color:"white", backgroundColor:"orange", borderRadius:20, margin:5, padding:5, paddingLeft:10, paddingRight:10}}>
              {this.state.genre}
            </Typography>


          </Container>


          <Container style={{height:"50vh", overflow:"scroll", backgroundColor:"#ffe3a1", borderRadius:5, margin:5, padding:20}} fixed>
            { this.renderReviewBox() }

            {this.state.reviews.map((review) => {
              return (
                <Container style={{width:"100%", backgroundColor:"#d9ffbf", borderRadius:5, margin:10, marginLeft:"auto", marginRight:"auto", padding:20}} fluid>
                    <Row>
                      <Col xs={1}>
                        <Avatar alt={review.userID.username} src="http://localhost:5000/images/1.png"  style={{margin:5}}/>
                      </Col>
                      <Col xs={11}>
                      <Rating name="read-only" value={review.rating} precision={1} size="small" readOnly />
                      <br />
                      <b style={{fontSize:18}} >
                        {review.userID.username}
                      </b>
                      <br />
                      <i class="text-break" style={{fontSize:14}}>
                        {review.description}
                      </i>
                      </Col>
                    </Row>
                </Container>
              );
            }
            )} 

          </Container>
        </Container>
      </Container>

    );
  }
}