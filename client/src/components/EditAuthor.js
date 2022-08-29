import React, { Component, useState }  from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/esm/Container";
import axios from "axios";

export default class EditAuthor extends Component{
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.editAuthor = this.editAuthor.bind(this);
        this.remove = this.remove.bind(this);

        this.state = {
          name: "",
          description: "",
          id: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1],
        }
    }

    componentDidMount(){
      axios.get('http://localhost:5000/authors/'+this.state.id, {
        method: 'GET',
        headers: {
          'token': localStorage.getItem('token'),
        },
      })
        .then(response => {
          this.setState({
            name: response.data.author.name,
            description: response.data.author.description,
          });
        })
        .catch(function(error){
          console.log(error);
        }
      );
    }

    onChangeName(e) {
        this.setState({
          name: e.target.value
        });
    };

    onChangeDescription(e) {
        this.setState({
          description: e.target.value
        });
    };

    
    async editAuthor(e) {
        e.preventDefault();

        const book = {
            name: this.state.name,
            description: this.state.description,
        }

        axios.post("http://localhost:5000/authors/update/"+this.state.id, book)
            .then(res => {
                window.alert(res.data.message);
                window.location = "/authors/";
            });
    }

    remove(e) {
        axios.delete('http://localhost:5000/authors/remove/'+this.state.id)
          .then(res => { 
            window.alert(res.data.message);
            window.location = "/authors/";
        });
    
        // this.setState({
        //   exercises: this.state.exercises.filter(el => el._id !== id)
        // })
      }

    render() {
        return(
            <Container>
                
                <br/><br/>
                <h3  style={{display:"flex",alignItems:"center",justifyContent:"center", color:"#ff7700"}}><i>Edit Author</i></h3>
                <br/><br/>
                <Container style={{ backgroundColor: "#fff0cc", padding:"2vw", paddingTop:"4vw", paddingBottom:"4vw"}} fluid>
                    <Row>
                        <Col></Col>
                        <Col xs={6}>
                            <Row>
                            <Form.Label column="sm" lg={2} style={{whiteSpace:'nowrap', width:"10vw"}}>Title:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeName} value={this.state.name} placeholder="Title of the book" />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2} style={{whiteSpace:'nowrap', width:"10vw"}}>Description:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" as="textarea" onChange={this.onChangeDescription} value={this.state.description} placeholder="" />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>
                                <Button className="float-end" size="sm" variant="warning" onClick={this.editAuthor}>Edit Author</Button>
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