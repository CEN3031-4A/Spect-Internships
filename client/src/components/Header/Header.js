import React from 'react';
import { Redirect } from 'react-router-dom';
import './Header.css';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { toast } from 'react-toastify';



class Header extends React.Component {

    constructor(props){
      super(props);
    }

    componentDidMount() {
      this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
    }
    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render(){
      let path = this.props.location.pathname;
      let user = this.props.auth.user;
      let authStudent = ('');

      let authBusiness = ('');

      connect(mapStateToProps);

      let noAuth = '';

      if(path == "/logout/success"){
        return ('');
      }
      if(this.props.auth.user){
          if(!user.profile && user.business && path != "/businessProfile/add"){
            toast.error("Please complete your profile first.")
            return (<Redirect to="/businessProfile/add"></Redirect>)
          }else if(!user.profile && !user.business && path != "/studentProfile/add"){
            toast.error("Please complete your profile first.")
            return (<Redirect to="/studentProfile/add"></Redirect>)
          }
      }

      if(this.props.auth.isAuthenticated && this.props.auth.user){
        if(this.props.auth.user.business){
            authBusiness = (
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
            <li className="nav-item dropdown navbar navbar-right">
                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="fa fa-user"></i> {  this.props.auth.user.email }
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href={ '/businessProfile/edit/' + this.props.auth.user.profile }>Business Profile</a>
                  {/* <a className="dropdown-item" href="#">Change Password</a> */}
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/logout">Sign Out</a>
                </div>
            </li>
            </div>
          );
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
                    <a className="dropdown-item" href="/logout">Sign Out</a>
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
              <li className="nav-item">
                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Register
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href={ '/signup' }>Student</a>
                    <a className="dropdown-item" href={ '/businessSignup' }>Business</a>
                  </div>
                </li>
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
            { authBusiness }
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


export default connect(mapStateToProps)(withRouter(Header));
