import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  //useRouteMatch,
} from 'react-router-dom';

import Swftli from './components/Swftli/Swftli.js';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/:uid' children={<Swftli />} />
      </Switch>
    </Router>
  );
};

export default App;
