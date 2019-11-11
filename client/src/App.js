import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import updateStudentProfile from './views/updateStudentProfile';
import EditBusinessProfile from './views/EditBusinessProfile';

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
         <Route exact path="/businessProfile/add" component={EditBusinessProfile}/>
        <Route exact path="/businessProfile/edit/:id" component={EditBusinessProfile}/>
        <Route exact path="/studentProfile/add" component={updateStudentProfile}/>
        <Route exact path="/studentProfile/edit/:id" component={updateStudentProfile}/>
        <Route component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
