import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Header from './Header.js';
import Phone from './Phone.js';
import Footer from '../Footer.js';

import './styles.css';

const server = 'http://localhost:5500';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authScreen: 'login',
      email: '',
      username: '',
      password: '',
      error: '',
    };
  }

  switchAuth = () => {
    this.setState({
      authScreen: this.state.authScreen === 'login' ? 'signup' : 'login',
      email: '',
      username: '',
      password: '',
      error: '',
    });
  };

  handleChange = (event) => {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (event) => {
    const target = event.target;

    event.preventDefault();

    if (target === 'login') {
    } else {
      this.setState({ error: '' });
      axios
        .post(
          `${server}/auth/signup`,
          {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'basic',
            },
          }
        )
        .then((res) => {
          const data = res.data;

          if ('Error' in data) {
            this.setState({ error: data.Error });
          } else {
            this.props.history.push('./' + data.Okay);
          }
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            error: 'Error: Could not communicate with server',
          });
        });
    }
  };

  render() {
    return (
      <div className='main'>
        <Header />
        <Phone
          style={
            this.state.authScreen === 'login'
              ? { right: 'calc(750px + 100px)', left: 0 }
              : { right: 0, left: 'calc(750px - 610px)' }
          }
        />
        <div className='authMain'>
          <div
            className='authForm login'
            style={
              this.state.authScreen === 'signup'
                ? { visibility: 'hidden' }
                : { visibility: 'visible' }
            }
          >
            <form name='login' onSubmit={this.handleSubmit}>
              <input
                name='username '
                className='authText'
                type='text'
                value={this.state.logUser}
                onChange={this.handleChange}
                placeholder='Username'
              />
              <br />
              <input
                name='password'
                className='authText'
                type='password'
                value={this.state.logPass}
                onChange={this.handleChange}
                placeholder='Password'
              />
              <br />
              <input className='authSubmit' type='submit' value='Log In' />
            </form>
            <hr />
            <div id='authGoogle' className='authLink'>
              <i className='fab fa-google' style={{ marginRight: '15px' }}></i>
              Log in with Google
            </div>
            <div className='authSubtext authLink'>Forgot password?</div>
            <hr />
            <div className='authSubtext'>
              Don't have an account?{' '}
              <span className='authSwitch authLink' onClick={this.switchAuth}>
                Sign Up
              </span>
            </div>
          </div>
          <div
            className='authForm signup'
            style={
              this.state.authScreen === 'login'
                ? { visibility: 'hidden' }
                : { visibility: 'visible' }
            }
          >
            <form name='signup' onSubmit={this.handleSubmit}>
              <input
                name='email'
                className='authText'
                type='text'
                value={this.state.signEmail}
                onChange={this.handleChange}
                placeholder='Email'
              />
              <br />
              <input
                name='username'
                className='authText'
                type='text'
                value={this.state.signUser}
                onChange={this.handleChange}
                placeholder='Username'
              />
              <br />
              <input
                name='password'
                className='authText'
                type='password'
                value={this.state.signPass}
                onChange={this.handleChange}
                placeholder='Password'
              />
              <br />
              <input className='authSubmit' type='submit' value='Sign Up' />
            </form>
            <hr />
            <div className='authSubtext'>
              Have an account?{' '}
              <span className='authSwitch authLink' onClick={this.switchAuth}>
                Log In
              </span>
            </div>
            <div className='authError'>{this.state.error}</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Auth);
