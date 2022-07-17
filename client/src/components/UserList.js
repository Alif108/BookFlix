import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserCard = (props) => {
    const user  = props.user;

    return(
        <div className="card-container">
            <div className="desc">
                {/* <h2>
                    <Link to={`/show-user/${user._id}`}>
                        { user.username }
                    </Link>
                </h2>
                <h3>{user.gender}</h3>
                <p>{user.region}</p> */}
                <table border="2">
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Region</th>
                    </tr>
                    <tr>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.gender}</td>
                        <td>{user.region}</td>
                    </tr>
                </table>
            </div>
        </div>
    )
};

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {users: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/userlist')
      .then(res => {
        this.setState({users: res.data})
      })
      .catch(err =>{
        console.log('Error from UserList');
      })
  };


  render() {
    const users = this.state.users;
    console.log("PrintUser: " + users);
    let userList;

    if(!users) {
      userList = "there is no user!";
    } else {
      userList = users.map((user, k) =>
        <UserCard user={user} key={k} />
      );
    }

    return (
      <div className="UserList">
        <div className="container">
          {/* <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Books List</h2>
            </div>

            <div className="col-md-11">
              <Link to="/create-user" className="btn btn-outline-warning float-right">
                + Add New Book
              </Link>
              <br />
              <br />
              <hr />
            </div>

          </div> */}

          <div className="list">
                {userList}
          </div>
        </div>
      </div>
    );
  }
}

export default UserList;