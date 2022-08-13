import React, { Component, useState }  from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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

export default class GetPackage extends Component{
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeContact = this.onChangeContact.bind(this);
        this.onChangeBkash = this.onChangeBkash.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.getPack = this.getPack.bind(this);
        
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

    async getPack(e) {
        e.preventDefault();

        const dict = {
            user_ID: this.state.user.id,
            package_ID: this.state.package._id,
            amount: this.state.package.price,
            name: this.state.name,
            contact: this.state.contact,
            bkash: this.state.bkash,
            address: this.state.address,
        }

        try {
            axios.post("http://localhost:5000/packages/getPackage/"+this.state.id, dict, {
                headers: {
                  'token': localStorage.getItem('token'),
                },
              })
                .then(res => {
                    if(res.data.success)
                        window.alert("Subscription successful");
                    else
                        window.alert("Subscription failed");
                });
        } catch (err) {
            console.log(err);
        }
        
        this.setState({
            name: "",
            contact: "",
            bkash: "",
            address: "",
        });
    }

    render() {
        return(
            <div>
                <h3>Your Selected Plan</h3>
                <div>
                    <Row>
                        <Col>
                        <div>
                            <Row xs={1} md={5} className="g-4">
                                {this.showPackage()}
                            </Row>
                        </div>
                        </Col>
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
                        <Col></Col>
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