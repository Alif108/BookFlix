import React, { Component, useState }  from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";

export default class GetPackage extends Component{
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeContact = this.onChangeContact.bind(this);
        this.onChangeBkash = this.onChangeBkash.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.getPack = this.getPack.bind(this);
        
        this.state = {
            id: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1],
            name: "",
            contact: "",
            bkash: "",
            address: "",
        }
    }

    // componentDidMount() {
    //     axios.get('http://localhost:5000/books/add', {
    //       method: 'GET',
    //       headers: {
    //         'token': localStorage.getItem('token'),
    //       },
    //     })
    //       .then(res => {
    //         console.log(res.data);
    //       })
    //       .catch(err =>{
    //         console.log('Error from adminHome');
    //       });
    // }

    onChangeUsername(e) {
        this.setState({
          name: e.target.value
        });
    };

    onChangeBkash(e) {
        this.setState({
          contact: e.target.value
        });
    };

    onChangeContact(e) {
        this.setState({
          bkash: e.target.value
        });
    };

    onChangeAddress(e) {
        this.setState({
          address: e.target.value
        });
    };

    async getPack(e) {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", this.state.name);
        formData.append("contact", this.state.contact);
        formData.append("bkash", this.state.bkash);
        formData.append("address", this.state.address);

        try {
            axios.post("http://localhost:5000/packages/get/"+this.state.id, formData, 
            {headers:{
                'Content-type': this.state.cover.type,
            }})
                .then(res => console.log(res.data));
        } catch (err) {
            console.log(err);
        }
        
        this.setState({
            name: "",
            contact: "",
            bkash: "",
            address: "",
        });
    }

    render() {
        return(
            <div>
                <h3>Your Selected Plan</h3>
                <div>
                    <Row>
                        <Col></Col>
                        <Col xs={5}>
                            <Row>
                                <Form.Label column="sm" lg={2}>name:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeUsername} value={this.state.name} placeholder="name of the book" />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2}>Author:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeContact} value={this.state.bkash} placeholder="Author of the book" />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2}>ISBN:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeBkash} value={this.state.contact} placeholder="ISBN of the book" />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2}>Address:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" as="textarea" onChange={this.onChangeAddress} value={this.state.address} placeholder="" />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>
                                <Button className="float-end" size="sm" variant="info" onClick={this.getPack}>Add Book</Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col></Col>
                    </Row>
                </div>
            </div>
        )
    }
    
}

//center the motherfucking h3
//fix labels of the inputs
//add validations
//add admin role base