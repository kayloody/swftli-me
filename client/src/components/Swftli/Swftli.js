import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

import Cards from './Cards/Cards';
import Header from './Header/Header.js';
import Footer from './Footer.js';

import './userStyles.css';

const server = 'http://localhost:5500';

class Swftli extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const uid = this.props.match.params.uid;

    axios
      .get(`${server}/users/${uid}`)
      .then((res) => {
        const data = res.data;

        if ('Error' in data) {
          this.setState({ status: 'Error', data: data.Error });
        } else {
          this.setState({ status: 'OK', data });
        }
      })
      .catch((err) => {
        this.setState({
          status: 'Error',
          data: 'Error: Could not communicate with server',
        });
      });
  }

  render() {
    let content = <div className='error'>Loading (swftli 😉)...</div>;

    if (this.state.status === 'OK') {
      let user = this.state.data;
      content = (
        <>
          <Header
            name={`@${user.username}`}
            img={user.userImg}
            socials={user.socials}
          />
          <Cards links={user.links} settings={user.settings} />
          <Footer />
        </>
      );
    } else if (this.state.data === 'No User Found') {
      content = (
        <div className='error'>
          Nobody owns this swftli
          <br />
          Quick snatch it!
        </div>
      );
    } else if (this.state.status === 'OK') {
      content = (
        <div className='error'>
          We are experiencing technical difficulty
          <br />
          Please try again later
        </div>
      );
    } else {
    }

    return <div className='swftli'>{content}</div>;
  }
}

export default withRouter(Swftli);
