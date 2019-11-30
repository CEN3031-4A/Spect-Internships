import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import ViewListing from './views/ViewListing';
import EditListing from './views/EditListing';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import updateStudentProfile from './views/updateStudentProfile';
import EditBusinessProfile from './views/EditBusinessProfile';
import businessListings from "./views/businessListings";
import AllListings from "./views/AllListings";


const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route exact path="/listing/add" component={EditListing}/>
        <Route exact path="/listing/edit/:id" component={EditListing}/>
         <Route exact path="/businessProfile/add" component={EditBusinessProfile}/>
        <Route exact path="/businessProfile/edit/:id" component={EditBusinessProfile}/>
        <Route exact path="/studentProfile/add" component={updateStudentProfile}/>
        <Route exact path="/studentProfile/edit/:id" component={updateStudentProfile}/>
	    	<Route exact path="/listing/view/:id" component={ViewListing}/>
        <Route exact path="/listing" component={AllListings} />
        <Route exact path="/businessListings/view/:id" component={businessListings} /> 
        <Route component={NotFound}/>
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
  );
}

export default App;
