import React, { useState } from 'react';

export default function Register() {

    // initializing fields
	const [username, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [birthday, setBirthday] = useState('')
	const [gender, setGender] = useState('')
	const [region, setRegion] = useState('Dhaka')

	async function registerUser(event) {

		// The preventDefault() method cancels the event if it is cancelable
        // event.preventDefault()

        // syntax : const response = await fetch(resource[, options]);
        // resource: the URL string, or a Request object
        // options: the configuration object with properties like method, headers, body, credentials, and more
		const response = await fetch("http://localhost:5000/register", {
			method: 'POST',

            // send as json
			headers: {
				'Content-Type': 'application/json',
			},

            // send this to backend
			body: JSON.stringify({
				username,
				email,
				password,
				birthday,
				gender,
				region,
			}),
		})
		.catch(error => {
			window.alert(error);
			return;
		  });


		//   alert("Registration Successful");
		//   window.location.href = "/login";

        // extract the JSON object from fetch response
		const data = await response.json()
		localStorage.setItem('token', data.token);

		console.log(data.user);
		console.log(data.token);

		if (data.user) {
			alert("Registration Successful");
			window.location = "/user";
			// navigate("/user");
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
			<h2>Register</h2><br/>
			<form onSubmit={registerUser}>
				
				{/* Name */}
				<input
					value={username}
					onChange={(e) => setName(e.target.value)}
					type="text"
					placeholder="Username"
					required
				/>
				<br />

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

				{/* Date of Birth */}
				<input
					value={birthday}
					onChange={(e) => setBirthday(e.target.value)}
					type="date"
					placeholder="Date of Birth"
					required
				/>
				<br />

				{/* Gender  */}
				<p>Gender</p>
				<input 
					value={gender}
					name="gender"
					onChange={(e) => setGender("Male")}
					type="radio"
					id="genderChoice1"
					required
				/>
				<label for="genderChoice1">Male</label>
				<input 
					value={gender}
					name="gender"
					onChange={(e) => setGender("Female")}
					type="radio"
					id="genderChoice2"
					required
				/>
				<label for="genderChoice2">Female</label>
				<br />

				{/* Region */}
				<p>Region</p>
				<select 
					name="cars" 
					id="cars"
					value={region}
					onChange={(e) => setRegion(e.target.value)}
					required
				>
					<option value="Dhaka">Dhaka</option>
					<option value="Chittagong">Chittagong</option>
					<option value="Sylhet">Sylhet</option>
					<option value="Rajshahi">Rajshahi</option>
					<option value="Barisal">Barisal</option>
					<option value="Khulna">Khulna</option>
				</select>

				<br />
				<input type="submit" value="Register" />
			</form>
		</div>
	)
}

// export default App