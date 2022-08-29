import React, { Component }  from "react";
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';

import axios from 'axios';

const Author = props => (

    <div style={{ width: '200px', height:'300px', padding:20, borderRadius:10, backgroundColor:"white", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}} onClick={() => window.location.href = '/authors/'+props.author._id} >
        <img src= { 'http://localhost:5000'+props.author.photoLocation } style={{height:200, width:160}}/>
        <i style={{margin:20}}>{ props.author.name }</i>
    </div>

)

export default class AuthorList extends Component{
  constructor(props){
    super(props);

    this.state = {
        user: "",
        authors: [],
    };

    this.searchAuthor = this.searchAuthor.bind(this);
  }

  async componentDidMount(){
    axios.get('http://localhost:5000/authors/', {
      method: 'GET',
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then(response => {
        this.setState({
            user: response.data.user,
            authors: response.data.authors,
        });
      })
      .catch(function(error){
        console.log(error);
      }
    );
  }

  async searchAuthor(event)
  {
    event.preventDefault();
    this.setState({query: event.target.value});
    console.log(this.state.query);

    if(this.state.query === ""){
      alert("Please enter a valid Query");
    }

    axios.get('http://localhost:5000/authors/searchAuthor/'+this.state.query, {
      method: 'GET',
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then(response => {
        // console.log(response.data);
        if(response.data.length === 0){
          alert("No Author found");
        }
        else
          this.setState({
            authors: response.data,
          });
      })
      .catch(function(error){
        console.log(error);
      }
    );
  }

    admin_privilege(currentAuthor)
    {
        if(this.state.user.role === "Admin")
            return (
            <div>
                <Link to={"/admin/editAuthor/"+currentAuthor._id} className="nav-link" >Edit</Link>
                <Link to={"/admin/removeAuthor/"+currentAuthor._id} className="nav-link" >Remove</Link>
            </div>
            );
    }

  authorList(){
    return this.state.authors.map(currentAuthor => {
      return (
        <div fluid>
            <Author author={currentAuthor} key={currentAuthor._id}/>
            {this.admin_privilege(currentAuthor)}
        </div>
      );
    })
  }

  showAuthorList(){
    if(this.state.authors.length > 0){
      return (
        <div>
          <Row xs={1} md={5} className="g-4">
              {this.authorList()}
          </Row>
        </div>
      );
    }
  }

  render(){
    return (
      <div style={{display: "flex", flexDirection: "column", backgroundColor:"#fff0cc",  alignItems: "center", justifyContent:"center"}}>
        <br />
        <Container style={{width:"50vw", margin:20}}>
          <Form class="form-inline my-2 my-lg-0" style={{display:"flex",flexDirection: "row", }}>
          <input class="form-control mr-sm-2" type="text" placeholder="Author" aria-label="Search" onChange={event => this.setState({query: event.target.value})} value={this.state.query}/>
          <Button variant='btn btn-warning my-2 my-sm-0' type="submit" onClick={this.searchAuthor}>Search</Button>
          </Form>
        </Container>
        <br />


        <div style={{width:"80vw", height:'calc(100vh - 70px)'}} fluid>
          {this.showAuthorList()}
        </div>
      </div>
    );
  }
}