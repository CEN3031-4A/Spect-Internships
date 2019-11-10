import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"
import updateStudentProfile from './views/updateStudentProfile';


const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route exact path="/studentProfile/add" component={updateStudentProfile}/>
        <Route exact path="/studentProfile/edit/:id" component={updateStudentProfile}/>
        <Route component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
