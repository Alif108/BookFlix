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
    this.state = {users: [], current_user:""};
  }

  componentDidMount() {

    axios.get('http://localhost:5000/admin/userlist', {
      method: 'GET',
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then(res => {
        this.setState({users: res.data.users, current_user: res.data.current_user})
      })
      .catch(err =>{
        console.log('Error from UserList');
      });
}

  render() {

    const users = this.state.users;
    const current_user = this.state.current_user;
    console.log(this.state.current_user);
    let userList;
    // let curr_user;

    if(!users) {
      // curr_user = "no current user"
      userList = "there is no user!";
    } else {
      // curr_user = current_user;
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
          <div className="user">
            <h1>
              {/* {current_user.username}   */}
              BookFlix
              </h1>
          </div>
          <div className="list">
                {userList}
          </div>
        </div>
      </div>
    );
  }
}

export default UserList;