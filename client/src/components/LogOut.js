///Home page if logged in as admin
import { Component } from 'react';
import axios from 'axios';

class logout extends Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
  
        axios.get('http://localhost:5000/logout', {
          method: 'GET',
        //   headers: {
        //     'token': localStorage.getItem('token'),
        //   },
        })
          .then(res => {
            console.log(res.data.message);
            // this.setState({user: res.data.user})
          })
          .catch(err =>{
            console.log('Error from logout');
          });
    }
  
    static LogOut()
    {
        localStorage.clear();
        window.location.href = "/";
    }
  }
  
  export default logout;