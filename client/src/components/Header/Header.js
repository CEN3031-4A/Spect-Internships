import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import './Header.css';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';



class Header extends React.Component {

    constructor(props){
      super(props);
    }

    startLogout(e){
      console.log("Starting Logout...");
      e.preventDefault();
      logout();
    }

    render(){
      let authStudent = ('');

      let authBusiness = ('');

      let noAuth = '';

      if(this.props.auth.isAuthenticated){
        if(this.props.auth.isBusinessAuthenticated){

        }else{
          authStudent = (
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
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
              </ul>
              {/* <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form> */}
              <li className="nav-item dropdown navbar navbar-right">
                  <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa fa-user"></i> {  this.props.auth.user.email }
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href={ '/studentProfile/edit/' + this.props.auth.user.profile }>My Profile</a>
                    {/* <a className="dropdown-item" href="#">Change Password</a> */}
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" onClick={this.startLogout.bind(this)}>Sign Out</a>
                  </div>
                </li>
            </div>
          );
        }
      }
      else{
        noAuth = (
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className="nav-item"><a className="nav-link" href="/signup"> Sign Up</a></li>
              <li className="nav-item"><a className="nav-link" href="/login"> Login</a></li>
            </ul>
              
          </div>
        );
      }
      return (
        <div className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Spect Internships</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            { authStudent }
            { noAuth }
          </div>
        );

    }

}

function mapStateToProps(state) {
  console.log("State Auth: " + JSON.stringify(state.auth));
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Header);
