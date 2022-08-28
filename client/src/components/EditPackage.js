import React, { Component }  from "react";
import { Link } from 'react-router-dom';
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";

export default class EditPackage extends Component{
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeMaxBooksLimit = this.onChangeMaxBooksLimit.bind(this);
        this.editPackage = this.editPackage.bind(this);

        this.state = {
          plan_name: "",
          price: "",
          duration: "",
          max_books_limit: "",
          id: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1],
        }
    }

    componentDidMount(){
      axios.get('http://localhost:5000/packages/'+this.state.id, {
        method: 'GET',
        headers: {
          'token': localStorage.getItem('token'),
        },
      })
        .then(response => {
          this.setState({
            plan_name: response.data.pack.plan_name,
            price: response.data.pack.price,
            duration: response.data.pack.duration,
            max_books_limit: response.data.pack.max_books_limit
          });
        })
        .catch(function(error){
          console.log(error);
        }
      );
    }

    onChangeName(e) {
        this.setState({
          plan_name: e.target.value
        });
    };

    onChangeDuration(e) {
        this.setState({
          duration: e.target.value
        });
    };

    onChangePrice(e) {
        this.setState({
          price: e.target.value
        });
    };

    onChangeMaxBooksLimit(e) {
        this.setState({
          max_books_limit: e.target.value
        });
    };

    editPackage(e) {
        e.preventDefault();

        console.log(this.state.id);

        const pack = {
            plan_name: this.state.plan_name,
            price: this.state.price,
            duration: this.state.duration,
            max_books_limit: this.state.max_books_limit,
        }

        axios.post("http://localhost:5000/packages/update/"+this.state.id, pack)
            .then(res => {
                console.log(res.data);
                if(res.data.success)
                    window.alert("Package updated successfully");
                else
                    window.alert("Package updated failed");
                window.location = "/packages/";
            });
    }

    // remove(e) {
    //     axios.delete('http://localhost:5000/books/remove/'+this.state.id)
    //       .then(response => { 
    //         console.log(response.data);
    //         window.alert("Book Removed");
    //         window.location = "/books/";
    //     });
    
        // this.setState({
        //   exercises: this.state.exercises.filter(el => el._id !== id)
        // })
    //   }

    render() {
        return(
            <Container>
                
                <br/><br/>
                <h3  style={{display:"flex",alignItems:"center",justifyContent:"center", color:"#ff7700"}}><i>Edit Package</i></h3>
                <br/><br/>
                <Container style={{ backgroundColor: "#fff0cc", padding:"2vw", paddingTop:"4vw", paddingBottom:"4vw", margin:20}} fluid>
                    <Row>
                        <Col></Col>
                        <Col xs={5}>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2} style={{whiteSpace:'nowrap', width:"10vw"}}>Plan Name:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeName} value={this.state.plan_name}/>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2} style={{whiteSpace:'nowrap', width:"10vw"}}>Duration:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeDuration} value={this.state.duration}/>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2} style={{whiteSpace:'nowrap', width:"10vw"}}>Price:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangePrice} value={this.state.price} />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2} style={{whiteSpace:'nowrap', width:"10vw"}}>Max Books Limit:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeMaxBooksLimit} value={this.state.max_books_limit} />
                                </Col>
                            </Row>
                            
                            <Row className='mt-2'>
                                <Col>
                                <Button className="float-end" size="sm" variant="warning" onClick={this.editPackage}>Update</Button>
                                {/* <Button className="float-end" size="sm" variant="danger" onClick={this.remove}>Remove</Button> */}
                                </Col>
                            </Row>
                        </Col>
                        <Col></Col>
                    </Row>
                
                </Container>

            </Container>
        )
    }
    
}