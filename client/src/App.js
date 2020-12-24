import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Auth from './components/Auth/Auth.js';
import OauthUser from './components/Admin/OauthUser/OauthUser.js';
import MyCards from './components/Admin/MyCards/MyCards.js';
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

  handleLogout = () => {
    axios
      .get(`${server}/auth/logout`, {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      })
      .then(() => {
        this.setState({
          server: true,
          auth: false,
          user: {},
        });
        window.open('./', '_self');
      })
      .catch(this.setState({ server: false }));
  };

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

    const mainPaths = ['/', '/home', '/admin', '/settings'];
    const noPaths = ['/login', '/signin', '/logout', '/signout', '/signup'];

    return (
      <Router>
        <Switch>
          <Route path={noPaths} component={NoPage} />
          {!auth ? (
            <Route exact path={mainPaths} component={Auth} />
          ) : !('oauth' in user) ? (
            <Route
              exact
              path={mainPaths}
              render={(props) => (
                <MyCards
                  {...props}
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                />
              )}
            />
          ) : user.oauth.new === false ? (
            <Route
              exact
              path={mainPaths}
              render={(props) => (
                <MyCards
                  {...props}
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                />
              )}
            />
          ) : (
            <Route
              exact
              path={mainPaths}
              render={(props) => (
                <OauthUser
                  {...props}
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                />
              )}
            />
          )}
          <Route path='/:uid' children={<Swftli />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
