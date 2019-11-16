import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import './Header.css';

const Header = () => {
    return (

        <div className="navbar navbar-expand-lg navbar-light bg-light" style={{marginBottom: 25 + 'px'}}>
        <a className="navbar-brand" href="#">Web App</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
      </div>
    )
}


export default Header;
