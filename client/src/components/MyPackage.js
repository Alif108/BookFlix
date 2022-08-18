import React, { Component, useState }  from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from "axios";

const Package = props => (
    <Col>
      <div>
        <Card style={{ width: '15rem' }}>
          <Card.Body>
            <Card.Title>{ props.package.plan_name }</Card.Title>
            <Card.Title>{ props.package.price }</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{ props.package.duration } Days</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">{ props.package.max_books_limit } Books</Card.Subtitle>
          </Card.Body>
        </Card>
      </div>
    </Col>
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
          <div>
            <h6>Expires in: </h6>
            <h4>{this.state.expiresIn} Days</h4>
          </div>
        );
    }
    
    showPackage()
    {
      if(this.state.package.length === 0)
        return(
          <div>
            <h1>You Are Not Subscribed!</h1>
          </div>
        );
      else
        return(
            <div>
                <Package package={this.state.package} />
            </div>
        );
    }

    render() {
        return(
            <div>
                <div>
                    <Row>
                        <Col>
                        <div>
                          <a href='/packages'>Get New Package</a>
                        </div>
                      </Col>
                        <Col>
                        <div>
                        <h3>Your Current Plan</h3>
                            <Row xs={1} md={5} className="g-4">
                                {this.showPackage()}
                            </Row>
                            <Row xs={1} md={5} className="g-4">
                                {this.showExpiresIn()}
                            </Row>
                        </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

//center the motherfucking h3
//fix labels of the inputs
//add validations
//add admin role base