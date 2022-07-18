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
        // this.saveCover = this.saveCover.bind(this);
        // this.savePdf = this.savePdf.bind(this);
        this.addBook = this.addBook.bind(this);
        this.remove = this.remove.bind(this);

        this.state = {
          title: "",
          isbn: "",
          author: "",
          publisher: "",
          year: "",
          genre: "",
          numPage: "",
          description: "",
          book: [],
          id: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1],
        }
    }

    componentDidMount(){
      axios.get('http://localhost:5000/books/'+this.state.id)
        .then(response => {
          this.setState({
            book: response.data,
            title: response.data.title,
            isbn: response.data.isbn,
            author: response.data.author,
            publisher: response.data.publisher,
            year: response.data.publishingYear,
            genre: response.data.genre,
            numPage: response.data.numPage,
            description: response.data.description,
          });
        })
        .catch(function(error){
          console.log(error);
        }
      );
    }


    onChangeTitle(e) {
        this.setState({
          title: e.target.value
        });
        //console.log(this.state.title);
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

    // saveCover(e) {
    //     this.setState({
    //         cover: e.target.files[0],
    //         coverName: e.target.files[0].name
    //     });  
    // };

    // savePdf(e) {
    //     this.setState({
    //         pdf: e.target.files[0],
    //         pdfName: e.target.files[0].name
    //     });
    // };

    async addBook(e) {
        e.preventDefault();

        const book = {
            title: this.state.title,
            isbn: this.state.isbn,
            author: this.state.author,
            publisher: this.state.publisher,
            publishingYear: this.state.year,
            genre: this.state.genre,
            numPage: this.state.numPage,
            description: this.state.description,
        }

        axios.post("http://localhost:5000/books/update/"+this.state.id, book)
            .then(res => {
                console.log(res.data);
                window.alert("Book updated successfully");
                window.location = "/books/";
            });
    }

    remove(e) {
        axios.delete('http://localhost:5000/books/remove/'+this.state.id)
          .then(response => { 
            console.log(response.data);
            window.alert("Book Removed");
            window.location = "/books/";
        });
    
        // this.setState({
        //   exercises: this.state.exercises.filter(el => el._id !== id)
        // })
      }

    render() {
        return(
            <div>
                <h3>Edit Book</h3>
                <div>
                    <Row>
                        <Col></Col>
                        <Col xs={3}>
                            <Row>
                                {/* <Form.Group controlId="formFileSm" className="mb-3">
                                    <Form.Label>Upload book cover</Form.Label>
                                    <Form.Control id="cover" className="w-75" type="file" size="sm" onChange={this.saveCover} ref={ref=> this.fileInput = ref}/>
                                </Form.Group> */}
                            </Row>
                            <Row>
                                {/* <Form.Group controlId="formFileSm" className="mb-3">
                                    <Form.Label>Upload PDF</Form.Label>
                                    <Form.Control id="pdf" className="w-75" type="file" size="sm" onChange={this.savePdf}/>
                                </Form.Group> */}
                            </Row>
                        </Col>
                        <Col xs={5}>
                            <Row>
                                <Form.Label column="sm" lg={2}>Title:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeTitle} value={this.state.title}/>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2}>Author:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeAuthor} value={this.state.author}/>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2}>ISBN:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeISBN} value={this.state.isbn} />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2}>Publisher:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangePublisher} value={this.state.publisher} />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2}>Publishing Year:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeYear} value={this.state.year} />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2}>Genre:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeGenre} value={this.state.genre} />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2}>Total pages:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeNumPage} value={this.state.numPage} />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2}>Description:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" as="textarea" onChange={this.onChangeDescription} value={this.state.description}/>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>
                                <Button className="float-end" size="sm" variant="info" onClick={this.addBook}>Update</Button>{"   "}
                                <Button className="float-end" size="sm" variant="danger" onClick={this.remove}>Remove</Button>
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