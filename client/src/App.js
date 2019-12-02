import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './views/Home/Home';
import NotFound from './views/NotFound';
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import ViewListing from './views/ViewListing';
import EditListing from './views/EditListing';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import updateStudentProfile from './views/updateStudentProfile';
import EditBusinessProfile from './views/EditBusinessProfile';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Alert from './components/layout/Alert';
import BusinessSignUp from './components/auth/BusinessSignUp';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import { loadBusiness } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import businessListings from "./views/businessListings";
import AllListings from './views/AllListings';
import PrivateRoute from './components/routing/PrivateRoute';
import BusinessPrivRoute from './components/routing/BusinessPrivRoute';
import { connect } from 'react-redux';


if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	//localStorage.clear();
	return (
		<Provider store={store}>
			<Router>
				<div>
					<Header />
					<Alert />
					<Switch style={{ paddingTop: 10 + 'px'}}>
						<Route exact path="/Home" component={Home} />
						<Route exact path="/">
							<Redirect to="/Home" />
						</Route>
						<Route exact path="/signup" component={SignUp} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/businessSignup" component={BusinessSignUp} />
						<Route exact path="/listing/add" component={EditListing} />
						<Route exact path="/listing/edit/:id" component={EditListing} />
						{/* <BusinessPrivRoute exact path="/businessProfile/add" component={EditBusinessProfile} /> */}
						<Route exact path="/businessProfile/add" component={EditBusinessProfile} />
						<Route exact path="/businessProfile/edit/:id" component={EditBusinessProfile} />
						<Route exact path="/studentProfile/add" component={updateStudentProfile} />
						{/* <PrivateRoute exact path="/studentProfile/add" component={updateStudentProfile} /> */}
						<Route exact path="/studentProfile/edit/:id" component={updateStudentProfile} />
						<Route exact path="/listing/view/:id" component={ViewListing} />
						<Route exact path="/listing" component={AllListings} />
        <Route exact path="/businessListings/view/:id" component={businessListings} />
						<Route component={NotFound} />
					</Switch>
					<ToastContainer
						position="bottom-right"
						autoClose={3000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnVisibilityChange
						draggable
						pauseOnHover
					/>
				</div>
			</Router>
		</Provider>
	);
};


export default App;
