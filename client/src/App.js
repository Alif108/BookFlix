import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/login";
import Navbar from "./components/navbar";
import AdminHome from "./components/adminHome"
import AddBook from "./components/addBook";


const App = () => {
  return (
    <Router>
      {/* <Navbar/> */}
      <div>
        <Routes>
          {/* <Route exact path="/" element={< Login/> }/> */}
          {/* <Route path="/admin" element={< AdminHome/> }/> */}
          <Route path="/admin/addbook" element={< AddBook/> }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
