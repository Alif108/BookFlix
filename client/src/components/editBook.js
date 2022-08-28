import React, { Component, useState }  from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/esm/Container";
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
          listOfGenre: [],
          id: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1],
        }
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
            book: response.data.book,
            title: response.data.book.title,
            isbn: response.data.book.isbn,
            author: response.data.book.author,
            publisher: response.data.book.publisher,
            year: response.data.book.publishingYear,
            genre: response.data.book.genre,
            numPage: response.data.book.numPage,
            description: response.data.book.description,
          });
          console.log(response.data.book.title);
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

    showGenres(){
        return this.state.listOfGenre.map((genre) => {
           return <option key={genre._id} value={genre._id}>{genre.name}</option>;
        });
    }

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
            <Container>
                
                <br/><br/>
                <h3  style={{display:"flex",alignItems:"center",justifyContent:"center", color:"#ff7700"}}><i>Edit Book</i></h3>
                <br/><br/>
                <Container style={{ backgroundColor: "#fff0cc", padding:"2vw", paddingTop:"4vw", paddingBottom:"4vw"}} fluid>
                    <Row>
                        <Col></Col>
                        {/*
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
                        </Col>*/}
                        <Col xs={6}>
                            <Row>
                            <Form.Label column="sm" lg={2} style={{whiteSpace:'nowrap', width:"10vw"}}>Title:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeTitle} value={this.state.title} placeholder="Title of the book" />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2} style={{whiteSpace:'nowrap', width:"10vw"}}>Author:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeAuthor} value={this.state.author} placeholder="Author of the book" />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2} style={{whiteSpace:'nowrap', width:"10vw"}}>ISBN:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeISBN} value={this.state.isbn} placeholder="ISBN of the book" />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2} style={{whiteSpace:'nowrap', width:"10vw"}}>Publisher:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangePublisher} value={this.state.publisher} placeholder="Publisher" />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2} style={{whiteSpace:'nowrap', width:"10vw"}}>Publishing Year:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeYear} value={this.state.year} placeholder="" />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2} style={{whiteSpace:'nowrap', width:"10vw"}}>Genre:</Form.Label>
                                <Col>
                                    {/* <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeGenre} value={this.state.genre} placeholder="" /> */}
                                    <select 
                                        name="region" 
                                        id="region"
                                        value={this.state.genre}
                                        onChange={this.onChangeGenre}
                                        required
                                    >
                                        {this.showGenres()}
                                        {/* <option value="Dhaka">Dhaka</option>
                                        <option value="Chittagong">Chittagong</option>
                                        <option value="Sylhet">Sylhet</option>
                                        <option value="Rajshahi">Rajshahi</option>
                                        <option value="Barisal">Barisal</option>
                                        <option value="Khulna">Khulna</option> */}
                                    </select>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2} style={{whiteSpace:'nowrap', width:"10vw"}}>Total pages:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeNumPage} value={this.state.numPage} placeholder="" />
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
                                <Button className="float-end" size="sm" variant="warning" onClick={this.addBook}>Add Book</Button>
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

//center the motherfucking h3
//fix labels of the inputs
//add validations
//add admin role base