import React, { Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class  ReadBook extends Component {
  constructor(props){
    super(props);
    

    this.componentDidMount = this.componentDidMount.bind(this);
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

    this.state = {
      book: [],
      user: [],
      id: window.location.pathname.split('/')[window.location.pathname.split('/').length - 2]
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
          user: response.data.user,
          book: response.data.book,
        });
      })
      .catch(function(error){
        console.log(error);
      }
    );
  }

  render(){
    return(
      <div>
        <h3>{this.state.book.title}</h3>
        {/* <Document file="https://www.pdf995.com/samples/pdf.pdf" onLoadError={console.error}>
          <Page pageNumber={1} />
        </Document> */}
        < Document file={ "http://localhost:5000"+this.state.book.pdfLocation } >
          <Page pageNumber={1} />
          <Page pageNumber={2} />
        </Document>
      </div> 
    );
  }
}
