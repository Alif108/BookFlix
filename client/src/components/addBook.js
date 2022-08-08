import React, { Component, useState }  from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";

export default class AddBook extends Component{
    constructor(props){
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeISBN = this.onChangeISBN.bind(this);
        this.onChangePublisher = this.onChangePublisher.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.onChangeNumPage = this.onChangeNumPage.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveCover = this.saveCover.bind(this);
        this.savePdf = this.savePdf.bind(this);
        this.addBook = this.addBook.bind(this);

        this.state = {
            title: "",
            isbn: "",
            author: "",
            publisher: "",
            year: "",
            genre: "",
            numPage: "",
            description: "",
            cover: null,
            coverName:"",
            pdf: null,
            pdfName:"",
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

    onChangeYear(e) {
        this.setState({
          year: e.target.value
        });
    };

    onChangeGenre(e) {
        this.setState({
          genre: e.target.value
        });
    };

    onChangeNumPage(e) {
        this.setState({
          numPage: e.target.value
        });
    };

    onChangeDescription(e) {
        this.setState({
          description: e.target.value
        });
    };

    saveCover(e) {
        this.setState({
            cover: e.target.files[0],
            coverName: e.target.files[0].name
        });  
    };

    savePdf(e) {
        this.setState({
            pdf: e.target.files[0],
            pdfName: e.target.files[0].name
        });
    };

    async addBook(e) {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", this.state.title);
        formData.append("isbn", this.state.isbn);
        formData.append("author", this.state.author);
        formData.append("publisher", this.state.publisher);
        formData.append("year", this.state.year);
        formData.append("genre", this.state.genre);
        formData.append("numPage", this.state.numPage);
        formData.append("description", this.state.description);
        formData.append("cover", this.state.cover, this.state.coverName);
        formData.append("pdf", this.state.pdf, this.state.pdfName);

        try {
            axios.post("http://localhost:5000/books/add", formData, 
            {headers:{
                'Content-type': this.state.cover.type,
            }})
                .then(res => console.log(res.data));
            window.alert("Book Added");
        } catch (err) {
            console.log(err);
        }
        

        this.setState({
            title: "",
            isbn: "",
            author: "",
            publisher: "",
            year: "",
            genre: "",
            numPage: "",
            description: "",
            cover: null,
            coverName:"",
            pdf: null,
            pdfName:"",
        });
        
        document.getElementById("cover").value = "";
        document.getElementById("pdf").value = "";
    }

    render() {
        return(
            <div>
                <h3>Add New Book</h3>
                <div>
                    <Row>
                        <Col></Col>
                        <Col xs={3}>
                            <Row>
                                <Form.Group controlId="formFileSm" className="mb-3">
                                    <Form.Label>Upload book cover</Form.Label>
                                    <Form.Control id="cover" className="w-75" type="file" size="sm" onChange={this.saveCover} ref={ref=> this.fileInput = ref}/>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group controlId="formFileSm" className="mb-3">
                                    <Form.Label>Upload PDF</Form.Label>
                                    <Form.Control id="pdf" className="w-75" type="file" size="sm" onChange={this.savePdf}/>
                                </Form.Group>
                            </Row>
                        </Col>
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
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeISBN} value={this.state.isbn} placeholder="ISBN of the book" />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2}>Publisher:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangePublisher} value={this.state.publisher} placeholder="Publisher" />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2}>Publishing Year:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeYear} value={this.state.year} placeholder="" />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2}>Genre:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeGenre} value={this.state.genre} placeholder="" />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2}>Total pages:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeNumPage} value={this.state.numPage} placeholder="" />
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
                                <Button className="float-end" size="sm" variant="info" onClick={this.addBook}>Add Book</Button>
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

//center the h3
//fix labels of the inputs
//add validations
//add admin role base