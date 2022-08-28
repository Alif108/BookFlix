import React, { Component }  from "react";
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const Author = props => (
  <Col>
    <div>
      <Card style={{ width: '15rem' }} onClick={() => window.location.href = '/authors/'+props.author._id}>
        <Card.Body>
            <Row>
                <img src= { 'http://localhost:5000'+props.author.photoLocation } style={{height:280, width:200}}/>
            </Row>
          <Card.Title>{ props.author.name }</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{ props.author.description }</Card.Subtitle>
        </Card.Body>
      </Card>
    </div>
  </Col>
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
        <div>
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
      <div>
        <div>
          <br />
          <form onSubmit={this.searchAuthor}>
            <input id="query" placeholder="Author" type="text" onChange={event => this.setState({query: event.target.value})} value={this.state.query}/>
            <button type="submit">Search</button>
          </form>
          <br />
        </div>
        <div>
          {this.showAuthorList()}
        </div>
      </div>
    );
  }
}