import React from 'react';
import axios from 'axios';

import Logo from '../../Logo.js';
import Footer from '../../Footer.js';

//const server = 'http://localhost:5000';
const server = 'https://api.swftli.me';

class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      message: 'Please enter email.',
      error: '',
    };
  }

  handleChange = (event) => {
    const target = event.target;

    this.setState({
      error: '',
      message: 'Please enter email.',
      email: target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      error: '',
      message: 'Please enter email.',
    });

    axios
      .post(
        `${server}/admin/passwordReset`,
        {
          email: this.state.email,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        const data = res.data;

        if ('error' in data) {
          this.setState({ error: data.error });
        } else {
          this.setState({ message: 'Temporary password sent.' });
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
        <Logo />
        <div className='resetContainer'>
          <div className='resetMessage'>
            {this.state.error ? this.state.error : this.state.message}
          </div>
          <form
            className='resetForm'
            name='resetEmail'
            onSubmit={this.handleSubmit}
          >
            <input
              name='email'
              className='resetInput'
              type='text'
              value={this.state.email}
              onChange={this.handleChange}
              placeholder='Email'
            />
            <button className='resetSubmit' type='submit'>
              <i className='fas fa-angle-right'></i>
            </button>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default PasswordReset;
