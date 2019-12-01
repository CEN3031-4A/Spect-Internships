import React from 'react';
import logo from '../../assets/logo.svg';
import './Home.css';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';

function Home() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p style={{ display: 'flex', flexDirection: 'column' }}>
					<Link to="/login"> Login </Link>
					<Link to="/login"> Signup </Link>
					<Link to="/businessProfile/add"> Business edit </Link>
					<Link to="/studentProfile/add"> student edit </Link>
					<button onClick={logout}> Log out </button>
				</p>
				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer" />
			</header>
		</div>
	);
}

export default Home;
