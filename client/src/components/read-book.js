import React, { useEffect, useRef } from "react";
import { Component } from "react";
import WebViewer from '@pdftron/pdfjs-express-viewer';
import axios from 'axios';
import { Container } from "react-bootstrap";


const reader = {
  width: '100%',
  height: '100vh',
};


export default class readBook extends Component{

  constructor(props){
    super(props);

    this.state = {
      book: [],
      user: [],
      readItem: [],
      // pdfLocation: "",
      id: window.location.pathname.split('/')[window.location.pathname.split('/').length - 2],
      viewer : React.createRef(null),
      pageNum: 1,
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    // this.buildWebViewer  = this.componentDidMount.bind(this);
    // this.getReadItem = this.getReadItem.bind(this);
  }

  componentDidMount(){    
    axios.get('http://localhost:5000/books/'+this.state.id, {
      method: 'GET',
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then(response => {
        console.log(response.data);
        this.setState({
          user: response.data.user,
          book: response.data.book,
          readItem: response.data.readItem,
          pageNum: this.state.readItem.currentPage,
        });
      }).catch(function(error){
        console.log(error);
      }
    );
  }

  // getReadItem(){
  //   //get page num
  //   axios.get('http://localhost:5000/read/getReadItem/'+this.state.id,{
  //     method: 'GET',
  //     headers: {
  //       'token': localStorage.getItem('token'),
  //     }
  //   })
  //   .then(response => {
  //     this.setState({
  //       pageNum: response.data.currentPage,
  //       pdfLocation: response.data.pdfLocation
  //     });
  //     console.log(this.state.pageNum);
  //   })
  //   .catch(function(error){
  //     console.log(error);
  //   })

    
    // const pagedata = await fetch('http://localhost:5000/read/getReadItem/'+this.state.id, {
    //   method: 'GET',
    //   headers: {
    //     'token': localStorage.getItem('token'),
    //   },
    // })
    // .then((response) => response.json())
    // .then(data => {
    //   return data
    // })

    // this.setState({
    //   pageNum: pagedata,
    // });

    // console.log(this.state.pageNum);
  //}

  savePage = async (page)=>{
    // Update page num
    const response = await fetch('http://localhost:5000/read/update/'+this.state.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        currentPage: page,
      })
    })
    const json = await response.json();
    console.log(json);
  }

  markFinished = async ()=>{
    //update readItem as finished
    const response = await fetch('http://localhost:5000/read/finished/'+this.state.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        finished: true,
      })
    })
    const json = await response.json();
    console.log(json);
  }


  buildWebViewer(){
    WebViewer(
      {
        path: '/lib',
        initialDoc: "http://localhost:5000" + this.state.book.pdfLocation,
        licenseKey: 'VMeLR5MsW5lX3X9YfqQF',
      },
      this.state.viewer.current,
    ).then((instance) => {
      // now you can access APIs through the WebViewer instance
      const { Core, UI } = instance;

      instance.UI.disableElements([ 'downloadButton', 'printButton' ]);

      // adding an event listener for when a document is loaded
      Core.documentViewer.addEventListener('documentLoaded', () => {
        console.log('document loaded');
        // setting the current page number
        Core.documentViewer.setCurrentPage(this.state.readItem.currentPage);
        console.log("Page loaded: ", this.state.readItem.currentPage);
      });

      // adding an event listener for when the page number has changed
      Core.documentViewer.addEventListener('pageNumberUpdated', (pageNumber) => {
        console.log(`Page number is: ${pageNumber}`);
        this.savePage(pageNumber);
      });

      // adds a button to the header that on click sets the page to the previous page
      UI.setHeaderItems(header => {
        header.push({
          type: 'actionButton',
          img: 'https://icons.getbootstrap.com/assets/icons/caret-left-fill.svg',
          onClick: () => {
            const currentPage = Core.documentViewer.getCurrentPage();
            const atFirstPage = currentPage === 1;

            if (atFirstPage) {
              Core.documentViewer.setCurrentPage(Core.documentViewer.getPageCount());
            } else {
              Core.documentViewer.setCurrentPage(currentPage - 1);
            }
          }
        });
      });

      // adds a button to the header that on click sets the page to the next page
      UI.setHeaderItems(header => {
        header.push({
          type: 'actionButton',
          img: 'https://icons.getbootstrap.com/assets/icons/caret-right-fill.svg',
          onClick: () => {
            const currentPage = Core.documentViewer.getCurrentPage();
            const totalPages = Core.documentViewer.getPageCount();
            const atLastPage = currentPage === totalPages;

            if (atLastPage) {
              Core.documentViewer.setCurrentPage(1);
              this.markFinished();
            } else {
              Core.documentViewer.setCurrentPage(currentPage + 1);
            }
          }
        });
      });    
    });
  }


  render(){
    this.buildWebViewer();
    return (
      <div className="MyComponent">
        <div>
        <Container style={{backgroundColor:"#fff0cc"}}>
          {/* <div className="header">{this.state.book.title}</div> */}
          <div className="webviewer" style={ reader } ref={this.state.viewer}></div>
        </Container>
      </div>
      </div>
    );
  }
}