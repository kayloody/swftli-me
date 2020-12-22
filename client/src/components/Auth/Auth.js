import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Header from './Header.js';
import Phone from './Phone.js';
import Footer from '../Footer.js';

import './styles.css';

const server = 'http://localhost:5000';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authScreen: 'login',
      email: '',
      username: '',
      password: '',
      error: '',
      field: '',
    };
  }

  switchAuth = () => {
    this.setState({
      authScreen: this.state.authScreen === 'login' ? 'signup' : 'login',
      email: '',
      username: '',
      password: '',
      error: '',
      field: '',
    });
  };

  handleChange = (event) => {
    const target = event.target;
    this.setState({
      [target.name]: target.value,
      field: this.state.field === target.name ? '' : this.state.field,
    });
  };

  handleLogin = (event) => {
    event.preventDefault();
    if (this.state.username === '' || this.state.password === '') {
    } else {
      axios
        .post(
          `${server}/auth/login`,
          {
            username: this.state.username,
            password: this.state.password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((res) => {
          console.log(res);
          const data = res.data;

          if ('error' in data) {
            this.setState({
              error: data.error,
              field: data.field,
            });
          } else {
            this.props.history.push('./' + data.okay);
          }
        })
        .catch(() => {
          this.setState({
            error: 'Error: Could not communicate with server',
          });
        });
    }
  };

  handleGoogle = (event) => {
    event.preventDefault();
    window.open('http://localhost:5000/auth/google', '_self');
    axios
      .get(`${server}/auth/google`)
      .then((res) => {
        console.log(res);
        const data = res.data;

        if (data.newUser === true) {
          this.props.history.push('./simmer');
        } else {
          this.props.history.push('./' + data.okay);
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          error: 'Error: Could not communicate with Google',
        });
      });
  };

  handleSignup = (event) => {
    event.preventDefault();
    if (
      this.state.email === '' ||
      this.state.username === '' ||
      this.state.password === ''
    ) {
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
            },
          }
        )
        .then((res) => {
          const data = res.data;

          if ('error' in data) {
            this.setState({ error: data.error, field: data.field });
          } else {
            this.props.history.push('./' + data.okay);
          }
        })
        .catch(() => {
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
            <form name='login' onSubmit={this.handleLogin}>
              <input
                name='username'
                className={
                  this.state.field !== 'username'
                    ? 'authText'
                    : 'authText authTextError'
                }
                type='text'
                value={this.state.logUser}
                onChange={this.handleChange}
                placeholder='Username'
              />
              <br />
              <input
                name='password'
                className={
                  this.state.field !== 'password'
                    ? 'authText'
                    : 'authText authTextError'
                }
                type='password'
                value={this.state.logPass}
                onChange={this.handleChange}
                placeholder='Password'
              />
              <br />
              <input className='authSubmit' type='submit' value='Log In' />
            </form>
            <hr />
            <div
              id='authGoogle'
              className='authLink'
              onClick={this.handleGoogle}
            >
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
            <div className='authError'>{this.state.error}</div>
          </div>
          <div
            className='authForm signup'
            style={
              this.state.authScreen === 'login'
                ? { visibility: 'hidden' }
                : { visibility: 'visible' }
            }
          >
            <form name='signup' onSubmit={this.handleSignup}>
              <input
                name='email'
                className={
                  this.state.field !== 'email'
                    ? 'authText'
                    : 'authText authTextError'
                }
                type='text'
                value={this.state.signEmail}
                onChange={this.handleChange}
                placeholder='Email'
              />
              <br />
              <input
                name='username'
                className={
                  this.state.field !== 'username'
                    ? 'authText'
                    : 'authText authTextError'
                }
                type='text'
                value={this.state.signUser}
                onChange={this.handleChange}
                placeholder='Username'
              />
              <br />
              <input
                name='password'
                className={
                  this.state.field !== 'password'
                    ? 'authText'
                    : 'authText authTextError'
                }
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
