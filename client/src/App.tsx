import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './lib/components';
import { Home, Login, Register } from './sections';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login} />
        <PrivateRoute path='/' component={Home} />
        <Route path='/register' component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
