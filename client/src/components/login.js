import { useState } from 'react';

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
				window.location.href = "/admin";
			else
				window.location.href = "/user";
        }
        else
        {
            alert("Please check your Email and Password");
        }
	}

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={loginUser}>
				
				{/* Email */}
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
					required
				/>
				<br />

				{/* Password */}
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
					required
				/>
				<br />

				<input type="submit" value="Sign in" />
			</form>
		</div>
	)
}

// export default App