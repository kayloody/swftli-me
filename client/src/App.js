import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Auth from './components/Auth/Auth.js';
import MyCards from './components/MyCards/MyCards.js';
import Swftli from './components/Swftli/Swftli.js';
import NoPage from './components/NoPage/NoPage.js';

const server = 'http://localhost:5000';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      server: true,
      auth: false,
      user: {},
    };
  }

  componentDidMount() {
    axios
      .get(`${server}/auth/status`, {
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      })
      .then((res) => {
        console.log(res);
        const data = res.data;
        if (data.auth) {
          this.setState({ auth: true, user: data.user });
        }
      })
      .catch(this.setState({ server: false }));
  }

  render() {
    const { auth, user } = this.state;
    return (
      <Router>
        <Switch>
          <Route
            path={['/home', '/login', 'signin', 'logout', 'signout', 'signup']}
            component={NoPage}
          />
          <Route path='/:uid' children={<Swftli />} />
          {!auth ? (
            <Route path='/' component={Auth} />
          ) : !(user.oauth === null) && user.oauth.new === true ? (
            <Route path='/' component={NoPage} />
          ) : (
            <Route path='/' component={MyCards} />
          )}
        </Switch>
      </Router>
    );
  }
}

export default App;
