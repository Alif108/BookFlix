import React, { Component }  from "react";
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { UserCard } from 'react-ui-cards';
import axios from 'axios';

const Package = props => (
  <Col>

      <UserCard
            float
            onClick={()=> props.handleClick(props.package._id)}
            header='http://localhost:5000/images/stack_of_books.png'
            avatar='http://localhost:5000/images/taka.png'
            name={ props.package.plan_name }
            positionName={ props.package.plan_description }
            stats={[
                {
                    name: 'Taka',
                    value: props.package.price,
                },
                {
                    name: 'Days',
                    value: props.package.duration,
                },
                {
                    name: 'Books',
                    value: props.package.max_books_limit,
                }
            ]}
        />

  </Col>
)

export default class PackageList extends Component{
  constructor(props){
    super(props);

    this.state = {
        user: "",
      packages: [],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount(){
    axios.get('http://localhost:5000/packages/', {
      method: 'GET',
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then(response => {
        this.setState({
            user: response.data.user,
            packages: response.data.packages,
        });
      })
      .catch(function(error){
        console.log(error);
      }
    );
  }

    admin_privilege(currentPackage)
    {
        if(this.state.user.role === "Admin")
            return (
            <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                <Link className='btn btn-warning' to={"/admin/editPackage/"+currentPackage._id} style={{marginLeft:40}}>Edit</Link>
                <Link className='btn btn-danger' to={"/admin/removePackage/"+currentPackage._id} style={{marginLeft:20}}>Remove</Link>
            </div>
            );
    }

    user_privilege(currentPackage)
    {
        if(this.state.user.role === "Basic")
            return (
            <div>
                <Link className='btn btn-warning' to={"/packages/getPackage/"+currentPackage._id} style={{marginLeft:85}}>Get Package</Link>
            </div>
            );
    }

    addPackage(){
        if(this.state.user.role === "Admin")
            return (
              <Link className='btn btn-danger' to={"/admin/addPackage"} style={{marginLeft:"auto", marginRight:100}}>Add Package</Link>
            );
    }

  async handleClick(id){
    if(this.state.user.role === "Basic")
      window.location = "/packages/getPackage/" + id;
    else if(this.state.user.role === "Admin")
      window.location = "/admin/editPackage/" + id;
  }

  packageList(){
    return this.state.packages.map(currentPackage => {
      return (
        <div  style={{marginLeft:50}}>
            <Package package={currentPackage} key={currentPackage._id} handleClick={this.handleClick}/>
            {this.admin_privilege(currentPackage)}
            {this.user_privilege(currentPackage)}
        </div>
      );
    })
  }

  showPackageList(){
    if(this.state.packages.length > 0){
      return (
          <Row xs={1} md={5} className="g-4" style={{margin:0}}>
              {this.packageList()}
          </Row>
      );
    }
  }

  render(){
    return (
      <div style={{display:"flex", flexDirection:"column",  backgroundColor:"#fff0cc", height:'calc(100vh - 70px)', alignItems:"center", paddingTop:50}} fluid>
        
        {this.addPackage()}
        {this.showPackageList()}
      </div>
    );
  }
}