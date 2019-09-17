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
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import PrivateRoute from "./components/routing/PrivateRoute";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Post from "./components/posts/Posts";

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
							<Route exact path="/profiles" component={ Profiles }/>
							<Route exact path="/profile/:id" component={ Profile }/>
							<PrivateRoute exact path="/dashboard" component={ Dashboard }/>
							<PrivateRoute exact path="/create-profile"
							              component={ CreateProfile }/>
							<PrivateRoute exact path="/edit-profile"
							              component={ EditProfile }/>
							<PrivateRoute exact path="/add-experience"
							              component={ AddExperience }/>
							<PrivateRoute exact path="/add-education"
							              component={ AddEducation }/>
							<PrivateRoute exact path="/posts"
							              component={ Post }/>
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	
	)
};

export default App;
