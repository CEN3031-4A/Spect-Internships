import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "/client/src/routes/Home/Home"


const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
