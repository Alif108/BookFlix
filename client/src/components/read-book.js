// import { useEffect, useRef } from 'react';
// import React, { Component }  from "react";
// import axios from 'axios';

// export function PdfViewerComponent(props) {
// 	const containerRef = useRef(null);

// 	useEffect(() => {
// 		const container = containerRef.current;
// 		let PSPDFKit;

// 		(async function () {
// 			PSPDFKit = await import('pspdfkit');
// 			PSPDFKit.load({
// 				// Container where PSPDFKit should be mounted.
// 				container,
// 				// The document to open.
// 				document: props.document,
// 				// Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
// 				baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
// 			});
// 		})();

// 		return () => PSPDFKit && PSPDFKit.unload(container);
// 	}, [props.document]);

// 	return (
// 		<div
// 			ref={containerRef}
// 			style={{ width: '100%', height: '100vh' }}
// 		/>
// 	);
// }

// export default class ReadBook extends Component{
//   constructor(props){
//     super(props);

//     this.state = {
//       book: [],
//       user: [],
//       id: window.location.pathname.split('/')[window.location.pathname.split('/').length - 2],
//     };

//     this.componentDidMount = this.componentDidMount.bind(this);

//   }

//   componentDidMount(){
//     axios.get('http://localhost:5000/books/'+this.state.id, {
//       method: 'GET',
//       headers: {
//         'token': localStorage.getItem('token'),
//       },
//     })
//       .then(response => {  
//         this.setState({
//           user: response.data.user,
//           book: response.data.book,
//         });
//       })
//       .catch(function(error){
//         console.log(error);
//       }
//     );
//   }

//   render(){
//     return(
//       <div className="container">
//         <div>
//           <h4>{this.state.book.title}</h4>
//           <h5>-{this.state.book.author}</h5>
//         </div>
//         <div className="pdf-reader">
//           <PdfViewerComponent 
//             document={"http://localhost:5000/" + this.state.book.pdfLocation}            
//           />

//         </div>
//       </div> 
//     )
//   }
// }


import React, { useEffect, useRef } from "react";
import { Component } from "react";
import WebViewer from '@pdftron/pdfjs-express-viewer';
import axios from 'axios';


// const MyComponent = () => {

export default class readBook extends Component{

  constructor(props){
    super(props);

    this.state = {
      book: [],
      user: [],
      id: window.location.pathname.split('/')[window.location.pathname.split('/').length - 2],
      viewer : React.createRef(null),
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    
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
      }).catch(function(error){
        console.log(error);
      }
    );
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
      });

      // adding an event listener for when the page number has changed
      Core.documentViewer.addEventListener('pageNumberUpdated', (pageNumber) => {
        console.log(`Page number is: ${pageNumber}`);
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
        <div className="header">{this.state.book.title}</div>
        <div className="webviewer" ref={this.state.viewer}></div>
      </div>
    );
  }
}
