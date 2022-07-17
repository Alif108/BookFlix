import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/login";
import Navbar from "./components/navbar";
import AdminHome from "./components/adminHome"
import AddBook from "./components/addBook";
import BookList from "./components/bookList";
import EditBook from "./components/editBook";
import BookProfile from "./components/book-profile";


const App = () => {
  return (
    <Router>
      <Navbar/>
      <div>
        <Routes>
          {/* <Route exact path="/" element={< Login/> }/> */}
          {/* <Route path="/admin" element={< AdminHome/> }/> */}
          <Route path="/books" element={< BookList/> }/>
          <Route path="/books/:id" element={< BookProfile/> }/>
          <Route path="/books/edit/:id" element={< EditBook/> }/>
          <Route path="/admin/addbook" element={< AddBook/> }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
