import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Login from "./login"

function TopPage(props) {
	return (
		<>
			<Container> 
				<Row>
					<Col>
						<div className="vh-100 d-flex flex-column align-items-center justify-content-center">
							<h1 className="text-muted">task management</h1>
						</div>
					</Col>
					<Col>
						<Login loggedIn={props.loggedIn} authenticate={props.authenticate} />
					</Col>
				</Row>
			</Container>
		</>

	)
}


export default TopPage;
