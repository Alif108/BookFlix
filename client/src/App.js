import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

// We use Route in order to define the different routes
import { Routes, Route } from 'react-router-dom'

// We import all the components we need in our app
import Home from "./components/Home"
import Register from "./components/Register"
import Login from "./components/Login"
import UserList from "./components/UserList"
import Navbar from "./components/navbar";
import AdminHome from "./components/adminHome"
import AddBook from "./components/addBook";
import BookList from "./components/bookList";
import EditBook from "./components/editBook";
import BookProfile from "./components/book-profile";

const App = () => {
	return (
		<div>
			<Routes>
				<Route path="/" exact element={<Home />} />
				{/* <Route exact path="/" element={< Login/> }/> */}
				{/* <Route path="/admin" element={< AdminHome/> }/> */}
				<Route path="/register" exact element={<Register />} />
				<Route path="/login" exact element={<Login />} />
				<Route path="/userlist" exact element={<UserList />} />
				<Route path="/books" element={< BookList/> }/>
				<Route path="/books/:id" element={< BookProfile/> }/>
				<Route path="/books/edit/:id" element={< EditBook/> }/>
				<Route path="/admin/addbook" element={< AddBook/> }/>
			</Routes>
		</div>
	);
};

export default App