import React from 'react';
import axios from 'axios';

import Header from '../Header.js';
import './styles.css';

import defaultImg from '../../../images/digitalia.PNG';

const server = 'http://localhost:5000';

class MyCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios
      .get(`${server}/admin/loadSettings`, {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      })
      .then((res) => {
        const data = res.data;

        if (!('status' in data)) {
          this.setState({
            userImg:
              data.userImg === '' || !('userImg' in data)
                ? defaultImg
                : data.userImg,
          });
        }
      })
      .catch(() => {
        this.setState({ status: 'Error' });
      });
  }
  render() {
    return (
      <div className='main'>
        <Header
          userImg={this.state.userImg}
          name={this.props.user.username}
          handleLogout={this.props.handleLogout}
          calledFrom='MyCards'
        />
        <p className='footer'>
          <br />
          Signed In.
        </p>
      </div>
    );
  }
}

export default MyCards;
