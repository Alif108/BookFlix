import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Login() {

    // initializing fields
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function loginUser(event) {

		// The preventDefault() method cancels the event if it is cancelable
        event.preventDefault()

        // syntax : const response = await fetch(resource[, options]);
        // resource: the URL string, or a Request object
        // options: the configuration object with properties like method, headers, body, credentials, and more
		const response = await fetch("http://localhost:5000/login", {
			method: 'POST',

            // send as json
			headers: {
				'Content-Type': 'application/json',
			},

            // send this to backend
			body: JSON.stringify({
				email,
				password,
			}),
		})
		.catch(error => {
			window.alert(error);
			return;
		  });

        // extract the JSON object from fetch response
		const data = await response.json();

		if(data.user)
        {
            localStorage.setItem('token', data.token);
			console.log("Login Successful");
			console.log(data.token);

            // redirect here
			// navigate("/userlist");
			if(data.user.role === "Admin")
				window.location.href = "/admin/stats/books";
			else
				window.location.href = "/user";
        }
        else
        {
            alert("Please check your Email and Password");
        }
	}


		const backdrop = {
		  display:"flex",
		  flexDirection: "column",
		  alignItems: "center",
		  justifyContent:"center",
		  backgroundImage: 'url("http://localhost:5000/images/backdrop.png")',
		  backgroundPosition: 'center',
		  backgroundSize: 'cover',
		  backgroundRepeat: 'no-repeat',
		  width: '100vw',
		  height: '100vh',
		};

	return (
		<div style={backdrop}>
			<img src="http://localhost:5000/images/logo.png" alt='BOOKFLIX'></img>
			<br/>
			<h2>Login</h2><br/>




			<Form  onSubmit={loginUser}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Control 
					type="email" 
					value={email}
					onChange={(e) => setEmail(e.target.value)} 
					placeholder="Enter email" 
					required
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Control 
					type="password" 
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password" 
					required
					/>
				</Form.Group>
				<div className="d-grid gap-2 col-12 mx-auto">
				<Button variant="warning" width="100vw" type="submit">Login</Button>
				<h6 href="/forgotPass">Forgot Password?</h6>
			</div>
			</Form>
		</div>
	)
}

//export default App