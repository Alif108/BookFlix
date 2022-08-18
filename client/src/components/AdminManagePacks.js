///Home page if logged in as admin
import React, { Component } from 'react';

class AdminManagePacks extends Component {
    
    render() {
        return (
            <div className="container">
                <div>
                    <a href='/admin/addpackage'>Add New Package</a><br></br>
                    <a href='/packages'>Packages</a><br></br>
                </div>
            </div>
        );
    }
  }
  
  export default AdminManagePacks;