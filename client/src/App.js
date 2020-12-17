import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  //useRouteMatch,
} from 'react-router-dom';

import Auth from './components/Auth/Auth.js';
import Swftli from './components/Swftli/Swftli.js';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route
          path={['/home', '/login', 'signin', 'logout', 'signout', 'signup']}
          component={Auth}
        />
        <Route path='/:uid' children={<Swftli />} />
        <Route path='/' component={Auth} />
      </Switch>
    </Router>
  );
};

export default App;
