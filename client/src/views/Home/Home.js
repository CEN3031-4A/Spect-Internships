import React from 'react';
import logo from '../../assets/logo.svg';
import './Home.css';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import {connect} from 'react-redux';

function Home({logout}) {
	return (
		<div className="App">
			<header className="App-header">
				<img src="https://149360317.v2.pressablecdn.com/wp-content/uploads/2019/11/spect-white-logo-scaled.png" className="App-logo" alt="logo" />
				<hr></hr>
				<p style={{ display: 'flex', flexDirection: 'column' }}>
					<div className="text-white text-center">Connecting Students and Employers on Soft Skills that Matter</div>
					
				</p>
				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer" />
			</header>
		</div>
	);
}

const mapStateToProps = (state) => {

};
export default connect(mapStateToProps, {logout})( Home);
