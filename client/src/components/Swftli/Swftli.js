import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

import Cards from './Cards/Cards';
import Header from './Header/Header.js';
import Footer from './Footer.js';
import Logo from '../Logo.js';

import './styles.css';

//const server = 'http://localhost:5000';
const server = 'https://swftli-me.herokuapp.com';

class Swftli extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const uid = this.props.match.params.uid;
    const style = document.documentElement.style;

    axios
      .get(`${server}/users/${uid}`)
      .then((res) => {
        const data = res.data;
        if ('Error' in data) {
          this.setState({ status: 'Error', data: data.Error });
        } else {
          this.setState({ status: 'OK', data });
          if ('settings' in data) {
            const custom = data.settings;

            if (custom.bgChoice === '1') {
              style.setProperty('--bg-color1', custom.bgColor1);
              style.setProperty('--bg-color2', custom.bgColor1);
            } else if (custom.bgChoice === '2') {
              style.setProperty('--bg-color1', custom.bgColor1);
              style.setProperty('--bg-color2', custom.bgColor2);
              style.setProperty('--bg-angle', custom.bgAngle);
            } else {
              style.setProperty('--bg-image', `url(${custom.bgImg})`);
            }

            if (custom.cardChoice === '1') {
              style.setProperty('--card-color1', custom.cardColor1);
              style.setProperty('--card-color2', custom.cardColor1);
            } else if (custom.cardChoice === '2') {
              style.setProperty('--card-color1', custom.cardColor1);
              style.setProperty('--card-color2', custom.cardColor2);
              style.setProperty('--card-angle', custom.cardAngle);
            } else {
              style.setProperty('--card-image', `url(${custom.cardImg})`);
            }

            style.setProperty('color', custom.textColor);
            style.setProperty('--border-color', custom.borderColor);
            style.setProperty('--social-color', custom.socialColor);
          }
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
    let content = (
      <div className='main'>
        <Logo />
        <br />
        <p className='cardMessage'>Swftli loading...</p>
      </div>
    );

    if (this.state.status === 'OK') {
      let user = this.state.data;
      content = (
        <>
          <Header
            name={`@${user.username}`}
            userImg={user.userImg}
            socials={user.socials}
          />
          <Cards links={user.links} settings={user.settings} />
          <Footer />
        </>
      );
    } else if (this.state.data === 'No User Found') {
      content = (
        <div className='main'>
          <Logo />
          <p className='cardMessage'>
            <br />
            Nobody owns {this.props.match.params.uid}.{' '}
            <a href='./' className='cardMessageLink'>
              Snatch it swftli!
            </a>
          </p>
        </div>
      );
    } else if (this.state.status !== 'OK') {
      content = (
        <div className='main'>
          <Logo />
          <p className='cardMessage'>
            <br />
            Server is down. Please try again later.
          </p>
        </div>
      );
    } else {
    }

    return <div className='main'>{content}</div>;
  }
}

export default withRouter(Swftli);
