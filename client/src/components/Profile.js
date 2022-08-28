import { Component } from "react";
import axios from "axios";

class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {user:""};
      }

      componentDidMount() {
  
        axios.get('http://localhost:5000/user/profile', {
          method: 'GET',
          headers: {
            'token': localStorage.getItem('token'),
          },
        })
          .then(res => {
            this.setState({user: res.data.user})
          })
          .catch(err =>{
            console.log('Error from Profile');
          });
    }

    render(){
        return(
            <div>
                {this.state.user.username}
            </div>
        );
    }


}

export default Profile;