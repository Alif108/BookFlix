
import Container from "react-bootstrap/esm/Container";
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function AddPackage() {

    // initializing fields
    const [plan_name, setPlanName] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [max_books_limit, setMaxBooksLimit] = useState('');

	async function addNewPackage(event) {
		
		await fetch("http://localhost:5000/packages/addPackage", {
			method: 'POST',

            // send as json
			headers: {
				'Content-Type': 'application/json',
                'token': localStorage.getItem('token'),
			},

            // send this to backend
			body: JSON.stringify({
				plan_name,
                price,
                duration,
                max_books_limit,
			}),
		})
		.then(response => {
			if(response.data.success)
				alert("Package added successfully");
			else
				alert("Package not added");
			window.location = "/packages";
		})
		.catch(error => {
			window.alert(error);
			return;
		  });
	}

    return (
		<Container>
			<br/><br/>
			<h3  style={{display:"flex",alignItems:"center",justifyContent:"center", color:"#ff7700"}}><i>Add New Package</i></h3>
			<br/><br/><form onSubmit={addNewPackage}>
			<Container style={{ backgroundColor: "#fff0cc", padding:"2vw", paddingTop:"4vw", paddingBottom:"4vw"}} fluid>
				<Row>
				
				<Col></Col>
                        <Col xs={5}>
                            <Row>
                                <Form.Label column="sm" lg={2} style={{whiteSpace:'nowrap', width:"10vw"}}>Plan Name:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={(e) => setPlanName(e.target.value)} value={plan_name}/>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2} style={{whiteSpace:'nowrap', width:"10vw"}}>Price:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={(e) => setPrice(e.target.value)} value={price}/>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2} style={{whiteSpace:'nowrap', width:"10vw"}}>Duration:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={(e) => setDuration(e.target.value)} value={duration}/>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Form.Label column="sm" lg={2} style={{whiteSpace:'nowrap', width:"10vw"}}>Max Books Limit:</Form.Label>
                                <Col>
                                    <Form.Control className="w-100" size="sm" type="text" onChange={(e) => setMaxBooksLimit(e.target.value)} value={max_books_limit} />
                                </Col>
                            </Row>
                            
                            <Row className='mt-2'>
                                <Col><br/>
                                <Button className="float-end" size="sm" variant="warning" type="submit">Add Package</Button>
			
                                {/* <Button className="float-end" size="sm" variant="danger" onClick={this.remove}>Remove</Button> */}
                                </Col>
                            </Row>
                        </Col>
                        <Col></Col>

				
			</Row>
			</Container>
</form>
		</Container>
	)
}