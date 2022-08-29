import React, { Component, useState }  from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/esm/Container";
import axios from "axios";

export default class EditBook extends Component{
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
        this.handleCheckGenre = this.handleCheckGenre.bind(this);
        this.onClickAuthor = this.onClickAuthor.bind(this);

        this.state = {
          title: "",
          isbn: "",
          author: "",
          author_name: "",
          publisher: "",
          year: "",
          genre: [],
          numPage: "",
          description: "",
          book: [],
          listOfGenre: [],
          listOfAuthor: [],
          id: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1],
        }

        const checkedGenres = [];
    }

    componentDidMount(){

        axios.get('http://localhost:5000/books/genres&authors/get', {
            method: 'GET',
            headers: {
            'token': localStorage.getItem('token'),
            },
        })
            .then(response => {
                this.setState({
                    listOfGenre: response.data.genre,
                    listOfAuthor: response.data.author,
                });
            })
            .catch(function(error){
                console.log(error);
            });

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
            author: response.data.author.name,
            publisher: response.data.book.publisher,
            year: response.data.book.publishingYear,
            genre: response.data.genre,
            numPage: response.data.book.numPage,
            description: response.data.book.description,
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
          author_name: e.target.value
        });
    };

    onClickAuthor(item)
    {
        this.setState({
            author_name: item.name,
            author: item._id
        });
    }

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

    handleCheckGenre(e) {
        if(e.target.checked){
            this.state.genre.push(e.target.value);
        }
        else{
            this.state.genre.splice(this.state.genre.indexOf(e.target.value), 1);
        }
    }

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

    // showGenres(){
    //     return this.state.listOfGenre.map((genre) => {
    //        return <option key={genre._id} value={genre._id}>{genre.name}</option>;
    //     });
    // }

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

      renderAuthors(){
        return(
            <div className="search-container">
                <div className="search-inner">
                    <input type="text" value={this.state.author_name} onChange={this.onChangeAuthor}/>
                </div>
                <div className="dropdown">
                {this.state.listOfAuthor.filter((item) => {
                    const searchTerm = this.state.author_name.toLowerCase();
                    const fullName = item.name.toLowerCase();

                    return (
                        searchTerm &&
                        fullName.startsWith(searchTerm) &&
                        fullName !== searchTerm
                    );
                    })
                    .slice(0, 10)
                    .map((item) => (
                    <div
                        onClick={() => this.onClickAuthor(item)}
                        className="dropdown-row"
                        key={item.name}
                    >
                        <div>
                            <img src= { 'http://localhost:5000'+item.photoLocation } style={{height:50, width:50}}/>
                            {item.name}
                        </div>
                    </div>
                    ))}
                </div>
        </div>
        );
    }

      renderGenres()
      {
          return(
              <div className="checkList">
                  <div className="list-container">
                  {/* {this.state.listOfGenre.map((item, index) => ( */}
                  {this.state.listOfGenre.map((gen) => (
                      <div key={gen._id}>
                      <input value={gen._id} type="checkbox" onChange={this.handleCheckGenre} />
                      <span >{gen.name}</span>
                      </div>
                  ))}
                  </div>
              </div>
          );
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
                                    { this.renderAuthors() }
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
                                    { this.renderGenres() }
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
                                <Button className="float-end" size="sm" variant="warning" onClick={this.addBook}>Edit Book</Button>
                                </Col>
                            </Row>
                            {/* <Row className='mt-2'>
                                <Col>
                                <Button className="float-end" size="sm" variant="warning" onClick={this.remove}>Remove</Button>
                                </Col>
                            </Row> */}
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