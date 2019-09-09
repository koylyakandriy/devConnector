import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//  Redux
import { Provider } from 'react-redux';

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Registration from "./components/auth/Registration";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";

//  Redux
import store from './store';
import { loadUserAction } from './actions/auth'
import setAuthToken from "./utils/setAuthToken";

import './App.css';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	
	// like componentDidMount
	useEffect(() => {
		store.dispatch(loadUserAction())
	}, []);
	
	return (
		<Provider store={ store }>
			<Router>
				<Fragment>
					<Navbar/>
					<Route exact path="/" component={ Landing }/>
					<section className="container">
						<Alert/>
						<Switch>
							<Route exact path="/registration" component={ Registration }/>
							<Route exact path="/login" component={ Login }/>
							<PrivateRoute exact path="/dashboard" component={ Dashboard }/>
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	
	)
};

export default App;
