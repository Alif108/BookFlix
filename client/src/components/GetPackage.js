import React, { Component, useState }  from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Typography from '@mui/material/Typography';
import { UserCard } from 'react-ui-cards';
import axios from "axios";

import Stripe from "react-stripe-checkout";

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

export default class GetPackage extends Component{
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeContact = this.onChangeContact.bind(this);
        this.onChangeBkash = this.onChangeBkash.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.tokenHandler = this.tokenHandler.bind(this);
        // this.getPack = this.getPack.bind(this);
        
        this.state = {
            id: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1],
            name: "",
            contact: "",
            bkash: "",
            address: "",
            package: "",
            user: "",
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/packages/' + this.state.id, {
          method: 'GET',
          headers: {
            'token': localStorage.getItem('token'),
          },
        })
          .then(res => {
            this.setState({user: res.data.user, package: res.data.pack});
          })
          .catch(err =>{
            console.log('Error from Package');
          });
    }

    onChangeName(e) {
        this.setState({
          name: e.target.value
        });
    };

    onChangeBkash(e) {
        this.setState({
          contact: e.target.value
        });
    };

    onChangeContact(e) {
        this.setState({
          bkash: e.target.value
        });
    };

    onChangeAddress(e) {
        this.setState({
          address: e.target.value
        });
    };

    showPackage()
    {
        return(
            <div>
                <Package package={this.state.package} />
            </div>
        );
    }

    handleToken(price, token){
        const dict = {
            stripeToken: token.id,
            amount: price,

            user_ID: this.state.user.id,
            package_ID: this.state.package._id,
        }
        try {
            axios.post("http://localhost:5000/packages/getPackage/"+this.state.id, dict, {
                headers: {
                    'token': localStorage.getItem('token'),
                },
            })
            .then(res => {
                window.alert(res.data.message);
                window.location = '/books';
        });
        } catch (err) {
            console.log(err);
        }
    }

    tokenHandler(token){
        console.log(this.state);
        this.handleToken(this.state.package.price, token);
    }

    // async getPack(e) {
    //     e.preventDefault();

    //     const dict = {
    //         user_ID: this.state.user.id,
    //         package_ID: this.state.package._id,
    //         amount: this.state.package.price,
    //         name: this.state.name,
    //         contact: this.state.contact,
    //         bkash: this.state.bkash,
    //         address: this.state.address,
    //     }

    //     try {
    //         axios.post("http://localhost:5000/packages/getPackage/"+this.state.id, dict, {
    //             headers: {
    //               'token': localStorage.getItem('token'),
    //             },
    //           })
    //             .then(res => {
    //                 window.alert(res.data.message);
    //             });
    //     } catch (err) {
    //         console.log(err);
    //     }
        
    //     this.setState({
    //         name: "",
    //         contact: "",
    //         bkash: "",
    //         address: "",
    //     });
    // }

    renderSubscriptionForm(){
        return(
            <Col xs={5}>
                <Row>
                    <Form.Label column="sm" lg={2}>Name:</Form.Label>
                    <Col>
                        <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeName} value={this.state.name} placeholder="Subscriber's Name" />
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Form.Label column="sm" lg={2}>BKash No:</Form.Label>
                    <Col>
                        <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeContact} value={this.state.bkash} placeholder="Bkash Number" />
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Form.Label column="sm" lg={2}>Contact No:</Form.Label>
                    <Col>
                        <Form.Control className="w-100" size="sm" type="text" onChange={this.onChangeBkash} value={this.state.contact} placeholder="Contact Number" />
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Form.Label column="sm" lg={2}>Address:</Form.Label>
                    <Col>
                        <Form.Control className="w-100" size="sm" as="textarea" onChange={this.onChangeAddress} value={this.state.address} placeholder="Subscriber's Address" />
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col>
                    <Button className="float-end" size="sm" variant="info" onClick={this.getPack}>Subscribe</Button>
                    </Col>
                </Row>
            </Col>
        );
    }

    renderStripeForm(){
        return (
            <Stripe
                stripeKey="pk_test_51LbmAWB88tkyq4SlJJSR4iNlnZk7qPyJEIWAqqcCf7oVQx9XriQIcPl3LWNldokzLqzIK2pcck5fuNRUJMufydHY00Fv7HLuvF"
                token={this.tokenHandler}
            />
        );
    }

    render() {
        return(
            <div style={{display:"flex", flexDirection:"column",  backgroundColor:"#fff0cc", padding:20, height:'calc(100vh - 70px)', alignItems:"center"}} fluid>
                

                <Typography style={{fontSize:28, color:"orange",  fontFamily:'impact'}}>Selected Plan</Typography>
                            {this.showPackage()}
                                               
                            {/* { this.renderSubscriptionForm() } */}
                            { this.renderStripeForm() }
                    
                    

            </div>
        )
    }
    
}

//center the motherfucking h3
//fix labels of the inputs
//add validations
//add admin role base