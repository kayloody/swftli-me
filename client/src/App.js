import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Auth from './components/Auth/Auth.js';
import OauthUser from './components/OauthUser/OauthUser.js';
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
        withCredentials: true,
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
    console.log(user);
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
          ) : !('oauth' in user) ? (
            <Route path='/' component={MyCards} />
          ) : user.oauth.new === false ? (
            <>
              <Route path='/' component={OauthUser} />
            </>
          ) : (
            <Route path='/' component={NoPage} />
          )}
        </Switch>
      </Router>
    );
  }
}

export default App;
