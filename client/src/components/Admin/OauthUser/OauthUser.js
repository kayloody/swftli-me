import React from 'react';
import axios from 'axios';

import Header from '../Header.js';
import Footer from '../../Footer.js';
import './styles.css';

//const server = 'http://localhost:5000';
const server = 'https://swftli-me.herokuapp.com';

class OauthUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      error: '',
    };
  }

  handleChange = (event) => {
    const target = event.target;

    this.setState({ username: target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        `${server}/admin/oauthuser`,
        {
          username: this.state.username,
        },
        {
          withCredentials: true,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
          },
        }
      )
      .then((res) => {
        const data = res.data;

        if ('error' in data) {
          this.setState({ error: data.error });
        } else {
          window.open('./', '_self');
        }
      })
      .catch(() => {
        this.setState({
          error: 'Oops, something happened.',
        });
      });
  };

  render() {
    return (
      <div className='main'>
        <Header
          userImg={this.props.user.userImg}
          name={
            this.state.error
              ? this.state.error
              : this.state.username
              ? '@' + this.state.username
              : 'Select a username'
          }
          handleLogout={this.props.handleLogout}
          calledFrom='OauthUser'
        />
        <div className='usernameContainer'>
          <form
            className='usernameForm'
            name='oauthUsername'
            onSubmit={this.handleSubmit}
          >
            <input
              name='username'
              className='usernameInput'
              type='text'
              value={this.state.username}
              onChange={this.handleChange}
              placeholder='Username'
            />
            <button className='usernameSubmit' type='submit'>
              <i className='fas fa-angle-right'></i>
            </button>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default OauthUser;
