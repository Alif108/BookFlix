import React, { Component, useState }  from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { UserCard } from 'react-ui-cards';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import axios from "axios";

const Package = props => (
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
  )

export default class MyPackage extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            package: "",
            user: "",
            expiresIn: "",
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/packages/user/myPackage', {
          method: 'GET',
          headers: {
            'token': localStorage.getItem('token'),
          },
        })
          .then(res => {
            this.setState({user: res.data.user, package: res.data.package, expiresIn: res.data.expiresIn});
          })
          .catch(err =>{
            console.log('Error from MyPackage');
          });

        // console.log(this.state.user);
    }

    showExpiresIn()
    {
      if(this.state.package.length !== 0)
        return(
          <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}} fluid>
          <Typography style={{fontSize:60, color:"orange", fontFamily:'impact'}}><b>{this.state.expiresIn} </b></Typography>
          <Typography style={{fontSize:28, fontFamily:'impact', whiteSpace:'nowrap'}}> Days remaining</Typography>
          </div>
        );
    }
    
    showPackage()
    {
      if(this.state.package.length === 0)
        return(
          <Typography style={{fontSize:60, fontFamily:'impact'}}>You Are Not Subscribed!</Typography>

          );
      else
        return(
          <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}} fluid>
          <Typography style={{fontSize:20, fontFamily:'impact'}}>Your Current Plan</Typography>
          <Package package={this.state.package} />
          </div>
        );
    }

    render() {
        return(
          <div style={{display:"flex", flexDirection:"column",  backgroundColor:"#fff0cc", height:'calc(100vh - 70px)', alignItems:"center"}} fluid>
                          
      
                      {this.showExpiresIn()}

                      {this.showPackage()}

                      <Link className='btn btn-warning' to={"/packages/"}>Get New Package</Link>
  

                </div>
        )
    }
}

//center the motherfucking h3
//fix labels of the inputs
//add validations
//add admin role base