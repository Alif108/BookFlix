import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

// We use Route in order to define the different routes
import { Routes, Route } from 'react-router-dom'

// We import all the components we need in our app
import Home from "./components/Home"
import Register from "./components/Register"
import Login from "./components/Login"
import UserList from "./components/UserList"
import NavigationBar from "./components/navbar";
import AdminHome from "./components/AdminHome"
import UserHome from "./components/UserHome";

import Profile from './components/Profile';

import AddBook from "./components/addBook";
import BookList from "./components/bookList";
import EditBook from "./components/editBook";
import BookProfile from "./components/book-profile";
import ReadBook from "./components/read-book";

import AddPackage from './components/AddPackage';
import AdminManagePacks from "./components/AdminManagePacks";
import PackageList from './components/PackageList';
import EditPackage from './components/EditPackage';
import RemovePackage from './components/RemovePackage';
import GetPackage from './components/GetPackage';
import MyPackage from './components/MyPackage';

import MyList from './components/MyList';
import RemoveMyList from './components/RemoveMyList';

import RequestBook from './components/RequestBook';
import ShowBookRequests from './components/showBookRequests';
import MyRequest from './components/MyRequest';

// import StatsBooks from './components/StatsBooks';	
// import StatsUsers from './components/StatsUsers';	
// import StatsFinance from './components/StatsFinance';

const App = () => {
	return (
		<div>
			<NavigationBar />
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/register" exact element={<Register />} />
				<Route path="/login" exact element={<Login />} />
				<Route path="/admin" element={< AdminHome/> }/>
				<Route path="/user" element={< UserHome/> }/>

				<Route path='/user/profile' element={< Profile/>}/>

				<Route path="/books" element={< BookList/> }/>
				<Route path="/books/:id" element={< BookProfile/> }/>
				<Route path="/books/:id/read" element={< ReadBook/> }/>
				<Route path="/books/edit/:id" element={< EditBook/> }/>
				<Route path='/books/user/getMyList' element={< MyList/> }/>
				<Route path='/books/removeMyList/:id' element={< RemoveMyList/> }/>

				<Route path="/admin/userlist" exact element={<UserList />} />
				<Route path="/admin/addbook" element={< AddBook/> }/>
				<Route path="/admin/addpackage" element={< AddPackage/> }/>
				<Route path="/admin/managePacks" element={< AdminManagePacks/> }/>
				<Route path="/admin/removePackage/:id" element={< RemovePackage/> }/>
				<Route path='/admin/editPackage/:id' element={< EditPackage/> }/>

				<Route path='/packages' element={< PackageList/> }/>
				<Route path='/packages/getPackage/:id' element={< GetPackage/> }/>
				<Route path='/packages/myPackage' element={< MyPackage/> }/>

				<Route path='/requestBook' element={< RequestBook/> }/>
				<Route path='/requestBook/requests' element={< ShowBookRequests/> }/>
				<Route path='/requestBook/myrequests/' element={< MyRequest/> }/>

				{/* <Route path='/admin/stats/books' element={< StatsBooks/> }/>	
				<Route path='/admin/stats/users' element={< StatsUsers/> }/>	
				<Route path='/admin/stats/finance' element={< StatsFinance/> }/> */}
			</Routes>
		</div>
	);
};

export default App