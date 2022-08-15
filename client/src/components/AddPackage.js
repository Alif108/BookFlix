import React, { useState } from 'react';

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
		<div>
			<h1>Add New Package</h1>
			<form onSubmit={addNewPackage}>
				
				{/* Plan Name */}
				<input
					value={plan_name}
					onChange={(e) => setPlanName(e.target.value)}
					type="text"
					placeholder="Plan Name"
					required
				/>
				<br />

				{/* Price */}
				<input
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					type="number"
					placeholder="Price"
					required
				/>
				<br />

				{/* Duration */}
				<input
					value={duration}
					onChange={(e) => setDuration(e.target.value)}
					type="number"
					placeholder="Duration (in Days)"
					required
				/>
				<br />

				{/* Maximum Books */}
				<input
					value={max_books_limit}
					onChange={(e) => setMaxBooksLimit(e.target.value)}
					type="number"
					placeholder="Maximum Books Limit"
				/>
				<br />

				<input type="submit" value="Add Package" />
			</form>
		</div>
	)
}