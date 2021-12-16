import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Board from "./components/board";
import NotFoundPage from "./components/notfound";
import TopPage from "./components/toppage";
import { useCookies } from "react-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';

function App(props) {
    const [cookies] = useCookies();
    const [loggedIn, setAuthenticated] = useState(cookies.authenticated === undefined ? false : true)

    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/boards">
                        {loggedIn ? <Board tasklist={props.tasklist} authenticate={setAuthenticated} /> : <Redirect to="/" />}
                    </Route>
                    <Route exact path="/">
                        {loggedIn ? <Redirect to="/boards" /> : <TopPage loggedIn={loggedIn} authenticate={setAuthenticated} />}
                    </Route>
                    <Route>
                        <NotFoundPage />
                    </Route>
                </Switch>
            </Router>
        </>
        )
}


export default App;
