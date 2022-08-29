///Home page if logged in as admin
import React, { Component }  from "react";
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ProgressBar from "react-bootstrap/ProgressBar";
import Container from "react-bootstrap/esm/Container";
import axios from 'axios';
import { Form } from "react-bootstrap";





class StatsBooks extends Component {
    
    constructor(props){
      super(props);
  
      this.state = {
          user: "",
          books: [],
          totaCount: 0,
          show: "",
          //initialize datepickers to current date and date minus one month
          fromDate: "",
          toDate: "",

          books: [],
          authors: [],
          packages: [],
      };

      this.handleChangeControl = this.handleChangeControl.bind(this);
      this.handleChangeFromDate = this.handleChangeFromDate.bind(this);
      this.handleChangeTodate = this.handleChangeTodate.bind(this);
      this.loadData = this.loadData.bind(this);
      this.loadbooks = this.loadbooks.bind(this);
      this.renderStatsBooks = this.renderStatsBooks.bind(this);
      this.loadauthors = this.loadauthors.bind(this);
      this.renderStatsAuthors = this.renderStatsAuthors.bind(this);
      this.renderStats = this.renderStats.bind(this);


    }
    
    handleChangeControl(event){
      this.setState({show: event.target.value});
    }

    handleChangeFromDate(event){
      this.setState({fromDate: event.target.value});
    }

    handleChangeTodate(event){
      this.setState({toDate: event.target.value});
    }

    loadbooks(){
      axios.get('http://localhost:5000/stats/popularity/books', {
        method: 'GET',
        headers: {
          'token': localStorage.getItem('token'),
        },
        params: {
          fromDate: this.state.fromDate,
          toDate: this.state.toDate,
        },
      })
        .then(res => {
          this.setState({books: res.data, totalCount: 0});
          for(var i = 0; i < res.data.length; i++){
            this.setState({totalCount: this.state.totalCount + res.data[i].count});
          }
          //console.log(this.state.books);
        }).catch(err =>{
          console.log('Error from navbar' + err);
        });
    }

    renderStatsBooks(){
      //map through books and display
      return this.state.books.map((book, i) => {
        return (
            //display book name and number of times it was read
            <Row key={i}>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>{book.book[0].title}</Card.Title>
                    <Card.Text>
                      <ProgressBar now={(book.count / this.state.totalCount) * 100} label={book.count} />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
        );
      });
    }

    loadauthors(){
      axios.get('http://localhost:5000/stats/popularity/authors', {
        method: 'GET',
        headers: {
          'token': localStorage.getItem('token'),
        },
        params: {
          fromDate: this.state.fromDate,
          toDate: this.state.toDate,
        },
      })
        .then(res => {
          this.setState({authors: res.data, totalCount: 0});
          for(var i = 0; i < res.data.length; i++){
            this.setState({totalCount: this.state.totalCount + res.data[i].count});
          }
          //console.log(this.state.authors);
        }).catch(err =>{
          console.log('Error from navbar' + err);
        });
    }

    renderStatsAuthors(){
      //map through authors and display
      return this.state.authors.map((author, i) => {
        return (
            //display author name and number of times it was read
            <Row key={i}>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>{author.author[0].name}</Card.Title>
                    <Card.Text>
                      <ProgressBar now={(author.count / this.state.totalCount) * 100} label={author.count} />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
        );
      });
    }

    loadpackages(){
      axios.get('http://localhost:5000/stats/popularity/packages', {
        method: 'GET',
        headers: {
          'token': localStorage.getItem('token'),
        },
        params: {
          fromDate: this.state.fromDate,
          toDate: this.state.toDate,
        },
      })
        .then(res => {
          this.setState({packages: res.data, totalCount: 0});
          for(var i = 0; i < res.data.length; i++){
            this.setState({totalCount: this.state.totalCount + res.data[i].count});
          }
          //console.log(this.state.packages);
        }).catch(err =>{
          console.log('Error from navbar' + err);
        });
    }

    renderStatsPackages(){
      //map through packages and display
      return this.state.packages.map((Package, i) => {
        return (
            //display package name and number of times it was read
            <Row key={i}>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>{Package.package[0].plan_name}</Card.Title>
                    <Card.Text>
                      <ProgressBar now={(Package.count / this.state.totalCount) * 100} label={Package.count} />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
        );
      });
    }

    renderStats(){
      if(this.state.show === "1"){
        return this.renderStatsBooks();
      }
      else if(this.state.show === "2"){
        return this.renderStatsAuthors();
      }
      else if(this.state.show === "3"){
        return this.renderStatsPackages();
      }
    }

    loadData(){
      if(this.state.show === "1"){
        this.loadbooks();
      }
      else if(this.state.show === "2"){
        this.loadauthors();
      }
      else if(this.state.show === "3"){
        this.loadpackages();
      }
    }

    render() {
        return ( 
    /*    <Container style={{padding:0, margin:0}} fluid>
        <NavigationBar />

     */    
        <Container style={{display: "flex", flexDirection: "row",  height:'calc(100vh - 70px)', padding:0}} fluid>
          <Container style={{ flex: 1,  flexDirection: "column", backgroundColor: "orange", padding: '3vh'}} >

          <Link style={{textDecoration:"none", color:"white",fontSize:20, padding:"5px 20px 5px 20px", borderRadius:50, backgroundColor:"black"}} to='/admin/stats/popularity/'>
            Popularity
          </Link>
          <br />
          <Link style={{textDecoration:"none", color:"white",fontSize:20, padding:"5px 20px 5px 20px", }} to='/admin/stats/finance/'>
            Finance
          </Link>

          </Container>
          <Container style={{ flex: 6, backgroundColor: "#fff0cc" , padding: '5vh'}} >
            {/* Form to take input */}
            <Form style={{display:"flex", flexDirection:"row", alignItem:"center", justifyContent:"center"}}>
              {/* dropdown field with label */}
              <Form.Group controlId="statsPopularity" style={{marginRight:50}}>
                <Form.Label>Show:</Form.Label>
                  <Form.Control as="select" onChange={this.handleChangeControl}>
                    {/* initially show books on control */}
                    <option value="">Select</option>
                    <option value="1">Books</option>
                    <option value="2">Author</option>
                    <option value="3">Packages</option>
                  </Form.Control>
              </Form.Group>
              {/* datepicker */}
              <Form.Group controlId="fromDate"  style={{marginRight:50}}>
                <Form.Label>From:</Form.Label>
                <Form.Control type="date" onChange={this.handleChangeFromDate} />
              </Form.Group>
              <Form.Group controlId="toDate"  style={{marginRight:50}}>
                <Form.Label>To:</Form.Label>
                <Form.Control type="date" onChange={this.handleChangeTodate} />
              </Form.Group>
              <Form.Group controlId="submit">
                <Button variant="warning" style={{margin:20, marginTop:30}} onClick={this.loadData}>
                  Get Stats
                </Button>
              </Form.Group>
            </Form>
            <hr/>


            {/* show stats */}
            <Container style={{height:"65vh", overflowY:"scroll"}} fluid>
                {this.renderStats()}
            </Container>
          </Container>

        </Container>


        );
    }
  }
  
  export default StatsBooks;