import React from 'react';
import logo from '../../assets/logo.svg';
import './Home.css';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

function Home() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h1>Welcome to Spect Internships</h1>
				<p>This is a place where students can come to find meaningful Internships to enhance their resume while businesses can find the best applicants for their job.</p>
				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer" />
			</header>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	  };
};
export default connect(mapStateToProps)( Home);
