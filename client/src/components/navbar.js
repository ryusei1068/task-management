import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import API from "./api";

function Navgation(props) {
	const deleteUserData = () => {
		props.authenticate(false);
		API.delete("user")
		.then(() => {
			alert("Bye 👋");
		})
		.catch(() => {
			alert("Sorry🙇‍♂️　Sever Error, Try again");
		});
	}

	const logOut = () => {
		props.authenticate(false);
		API.put("logout")
		.catch(() => {
			window.location.reload()
		})
	}

    return (
		<>
			<Nav className="m-2">
				<Navbar expand="lg">	
					<Navbar.Brand>task management</Navbar.Brand>
					<Button className="mx-2" variant="outline-secondary" onClick={logOut}>Logout</Button>
					<Button variant="outline-secondary" onClick={deleteUserData}>Delete</Button>
				</Navbar>
			</Nav>
		</>
    )
}

export default Navgation;
