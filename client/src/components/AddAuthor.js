import React, { Component, useState }  from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";

export default class AddAuthor extends Component{
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.savePhoto = this.savePhoto.bind(this);
        this.addAuthor = this.addAuthor.bind(this);

        this.state = {
            name: "",
            description: "",
            photo: null,
        }
    }

    // async componentDidMount(){
    //     axios.get('http://localhost:5000/books/genres/getGenres', {
    //       method: 'GET',
    //       headers: {
    //         'token': localStorage.getItem('token'),
    //       },
    //     })
    //       .then(response => {
    //         this.setState({
    //           listOfGenre: response.data,
    //         });
    //       })
    //       .catch(function(error){
    //         console.log(error);
    //       });
    //   }

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

    savePhoto(e) {
        this.setState({
            photo: e.target.files[0],
            photoName: e.target.files[0].name
        });  
    };

    async addAuthor(e) {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", this.state.name);
        formData.append("description", this.state.description);
        formData.append("photo", this.state.photo, this.state.photoName);
        
        console.log(formData);

        try 
        {
            axios.post("http://localhost:5000/authors/add", formData, 
            {
                headers: {
                    'Content-type': this.state.photo.type,
                    'token': localStorage.getItem('token'),
                },
            })
                .then(res => 
                    {
                        console.log(res.data);
                        window.alert(res.data.message);
                    });
            } catch (err) {
                console.log(err);
        }
        

        this.setState({
            name: "",
            description: "",
            photo: null,
        });

        document.getElementById("photo").value = "";
    }

    render() {
        return(
            <div><br/><br/>
                <h3  class="text-warning" style={{display:"flex",alignItems:"center",justifyContent:"center"}}><i>Add New Author</i></h3>
                <br/><br/>
                <div>
                    <Row>
                        <Col></Col>
                        <Col xs={3}>
                            <Row>
                                <Form.Group controlId="formFileSm" className="mb-3">
                                    <Form.Label>Upload Author Photo</Form.Label>
                                    <Form.Control id="photo" className="w-75" type="file" size="sm" onChange={this.savePhoto} ref={ref=> this.fileInput = ref}/>
                                </Form.Group>
                            </Row>
                        </Col>
                        <Col xs={5}>
                            <Row>
                                <Form.Label column="sm" lg={2}>Name:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeName} value={this.state.name} placeholder="Name of the Author" />
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
                                <Button className="float-end" size="sm" variant="warning" onClick={this.addAuthor}>Add Author</Button>
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