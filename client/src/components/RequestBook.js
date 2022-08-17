import React, { Component, useState }  from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";

export default class RequestBook extends Component{
    constructor(props){
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeISBN = this.onChangeISBN.bind(this);
        this.onChangePublisher = this.onChangePublisher.bind(this);       
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePublishingYear = this.onChangePublishingYear.bind(this);
        this.submitRequest = this.submitRequest.bind(this);

        this.state = {
            title: "",
            isbn: "",
            author: "",
            publisher: "",
            publishing_year: "",
            description: "",
        }
    }

    onChangeTitle(e) {
        this.setState({
          title: e.target.value
        });
    };

    onChangeISBN(e) {
        this.setState({
          isbn: e.target.value
        });
    };

    onChangeAuthor(e) {
        this.setState({
          author: e.target.value
        });
    };

    onChangePublisher(e) {
        this.setState({
          publisher: e.target.value
        });
    };

    onChangePublishingYear(e) {
        this.setState({
          publishing_year: e.target.value
        });
    };

    onChangeDescription(e) {
        this.setState({
          description: e.target.value
        });
    };
    
    async submitRequest(e) {
        e.preventDefault();

        console.log(this.state);

        const dict = {
            title: this.state.title,
            author: this.state.author,
            isbn: this.state.isbn,
            publisher: this.state.publisher,
            publishing_year: this.state.publishing_year,
            description: this.state.description,
        }

        // const title = this.state.title;
        // const author = this.state.author;
        // const isbn = this.state.isbn;
        // const publisher = this.state.publisher;
        // const publishing_year = this.state.publishing_year;
        // const description = this.state.description;

        // const formData = new FormData();
        // formData.append("title", this.state.title);
        // formData.append("isbn", this.state.isbn);
        // formData.append("author", this.state.author);
        // formData.append("publisher", this.state.publisher);
        // formData.append("publishing_year", this.state.publishing_year);
        // formData.append("description", this.state.description);

        // console.log(formData);

        try {
            axios.post("http://localhost:5000/requestBook", dict,
            {
                // method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  'token': localStorage.getItem('token'),
                },
            })
            .then(res => 
                {
                    window.alert(res.data.message);
                })
            .catch(err => console.log(err));
        } catch (err) {
            console.log(err);
        }
        
        this.setState({
            title: "",
            isbn: "",
            author: "",
            publisher: "",
            publishing_year: "",
            description: "",
        });
    }

    render() {
        return(
            <div><br/><br/>
                <h3  class="text-warning" style={{display:"flex",alignItems:"center",justifyContent:"center"}}><i>Request a Book</i></h3>
                <p style={{display:"flex",alignItems:"center",justifyContent:"center"}}>Sorry if you haven't found your favourite book here, but hey, why don't you request it?</p>
                <p style={{display:"flex",alignItems:"center",justifyContent:"center"}}>We will try our best to include your favourite book</p>
                <br/><br/>
                <div>
                    <Row>
                        <Col></Col>
                        <Col xs={5}>
                            <Row>
                                <Form.Label column="sm" lg={2}>Title:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeTitle} value={this.state.title} placeholder="Title of the book" />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2}>Author:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeAuthor} value={this.state.author} placeholder="Author of the book" />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2}>ISBN:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeISBN} value={this.state.isbn} placeholder="ISBN of the book" required="false"/>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2}>Publisher:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangePublisher} value={this.state.publisher} placeholder="Publisher of the book" required="false"/>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2}>Publishing Year:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangePublishingYear} value={this.state.publishing_year} placeholder="Publishing Year of the book" required="false"/>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2}>Description:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" as="textarea" onChange={this.onChangeDescription} value={this.state.description} placeholder="" />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>
                                <Button className="float-end" size="sm" variant="warning" onClick={this.submitRequest}>Submit Request</Button>
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
