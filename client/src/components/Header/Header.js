import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import './Header.css';

const Header = () => {
    return (
        <div className="navbar navbar-expand-lg navbar-light bg-light" style={{marginBottom: 25 + 'px'}}>
        <a className="navbar-brand" href="#">Spect Internships</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
  
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/listing/add">Add</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/listing">View</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Profiles
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/studentProfile/edit/5dc8ce69d5d81243d0441210">Edit Student Profile</a>
              <a className="dropdown-item" href="/businessProfile/edit/5dc8d230ec1fc933e494ca6b">Edit Business Profile</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
          {/* <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form> */}
          <li className="nav-item dropdown navbar navbar-right">
              <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fa fa-user"></i>  John Doe
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/studentProfile/edit/5dc8ce69d5d81243d0441210">My Profile</a>
                <a className="dropdown-item" href="#">Change Password</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Sign Out</a>
              </div>
            </li>
        </div>

      </div>
    )
}


export default Header;
