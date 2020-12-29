import React from 'react';
import axios from 'axios';

import Header from '../Header.js';
import Footer from '../../Footer.js';

import './styles.css';

import defaultImg from '../../../images/digitalia.PNG';

const server = 'http://localhost:5000';

class MySettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: '',
      userImg: defaultImg,
      bgColor1: '#d4bec0',
      bgColor2: '#a2c6ca',
      bgAngle: '45deg',
      bgImage: 'none',
      bgChoice: '2',
      cardColor1: '#f8f8f5',
      cardColor2: '#f8f8f5',
      cardAngle: '45deg',
      cardImage: 'none',
      cardChoice: '2',
      textColor: '#5f5d54',
      borderColor: '#929b94',
      socialColor: '#f2f3ef',
    };
  }

  handleChange = (event) => {
    const target = event.target;
    this.setState({ [target.name]: target.value, status: '' });
  };

  saveSettings = () => {
    this.setState({ status: 'Saving' });

    axios
      .post(`${server}/admin/settings`, this.state, {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      })
      .then((res) => {
        this.setState({ status: res.data.status });
      })
      .catch(() => {
        this.setState({ status: 'Error' });
      });
  };

  deleteAccount = () => {
    axios
      .get(`${server}/admin/delete`, {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      })
      .then((res) => {
        if (res.data.status === 'Okay') {
          window.open('../', '_self');
        } else {
          this.setState({ status: 'Oops' });
        }
      })
      .catch(() => {
        this.setState({ status: 'Oops' });
      });
  };

  componentDidMount() {
    const user = this.props.user;

    this.setState({
      userImg: user.userImg === '' ? this.state.userImg : user.userImg,
    });

    this.setState(this.props.user.settings);
  }

  render() {
    let statusMessage = '';
    let settingsStatus = '';
    switch (this.state.status) {
      case 'Okay':
        statusMessage = <i className='fas fa-check'></i>;
        settingsStatus = 'settingsStatusGood';
        break;
      case 'Error':
        statusMessage = <i className='fas fa-times'></i>;
        settingsStatus = 'settingsStatusBad';
        break;
      case 'Invalid Color':
        statusMessage = (
          <div>
            <i className='fas fa-times'></i>
            <span style={{ marginLeft: '10px' }}>Invalid Color</span>
          </div>
        );
        settingsStatus = 'settingsStatusBad';
        break;
      case 'Saving':
        statusMessage = <i className='fas fa-spinner'></i>;
        settingsStatus = 'settingsStatusNeutral';
        break;
      default:
        settingsStatus = 'settingsStatusHide';
        break;
      // code block
    }
    return (
      <div className='main'>
        <Header
          userImg={this.state.userImg}
          name={this.props.user.username}
          handleLogout={this.props.handleLogout}
          calledFrom='MySettings'
        />
        <div className='settings'>
          <div className='settingsSection'>
            <div className='settingsH'>
              <img className='adminImage' src={this.state.userImg} alt='User' />
              <div className='settingsButton'>Upload</div>
              <div className='settingsButton settingsButtonRed'>Remove</div>
            </div>
          </div>
          <div className='settingsSection'>
            <div className='settingsName'>Socials</div>
          </div>
          <div className='settingsSection'>
            <div className='settingsName'>Background</div>
            <div className='settingsV'>
              <div className='settingsH'>
                <div
                  className='settingsCard settingsBgCard'
                  style={{ background: this.state.bgColor1 }}
                ></div>
                <div
                  className='settingsCard settingsBgCard'
                  style={{
                    background: `linear-gradient(
                        ${this.state.bgAngle},
                        ${this.state.bgColor1} 0%,
                        ${this.state.bgColor2} 100%
                      )`,
                  }}
                ></div>
                <div
                  className='settingsCard settingsBgCard'
                  style={{ background: this.state.bgImage }}
                >
                  <i className='far fa-image settingsImageIcon'></i>
                </div>
              </div>
              <div className='settingsH'>
                <div className='settingsColor'>
                  <div
                    className='settingsColorPreview'
                    style={{ background: this.state.bgColor1 }}
                  ></div>
                  <textarea
                    name='bgColor1'
                    rows='1'
                    cols='10'
                    maxLength='7'
                    className='settingsColorText'
                    value={this.state.bgColor1}
                    onChange={this.handleChange}
                  ></textarea>
                </div>
                <div className='settingsColor'>
                  <div
                    className='settingsColorPreview'
                    style={{ background: this.state.bgColor2 }}
                  ></div>
                  <textarea
                    name='bgColor2'
                    rows='1'
                    cols='10'
                    maxLength='7'
                    className='settingsColorText'
                    value={this.state.bgColor2}
                    onChange={this.handleChange}
                  ></textarea>
                </div>
                <div className='settingsDropdown'>
                  <select
                    name='bgAngle'
                    className='settingsSelect'
                    defaultValue='45deg'
                    onChange={this.handleChange}
                  >
                    <option value='90deg'>Horizontal</option>
                    <option value='180deg'>Vertical</option>
                    <option value='45deg'>Diagonal A</option>
                    <option value='-45deg'>Diagonal B</option>
                  </select>
                </div>
              </div>
            </div>
            {/* </div>
          <div className='settingsSection'> */}
            <div className='settingsName'>Buttons</div>
            <div className='settingsV'>
              <div className='settingsH'>
                <div
                  className='settingsCard settingsCardCard'
                  style={{ background: this.state.cardColor1 }}
                ></div>
                <div
                  className='settingsCard settingsCardCard'
                  style={{
                    background: `linear-gradient(
                        ${this.state.cardAngle},
                        ${this.state.cardColor1} 0%,
                        ${this.state.cardColor2} 100%
                      )`,
                  }}
                ></div>
                <div className='settingsCard settingsCardCard'>
                  <i className='far fa-image settingsImageIcon'></i>
                </div>
              </div>
              <div className='settingsH'>
                <div className='settingsColor'>
                  <div
                    className='settingsColorPreview'
                    style={{ background: this.state.cardColor1 }}
                  ></div>
                  <textarea
                    name='cardColor1'
                    rows='1'
                    cols='10'
                    maxLength='7'
                    className='settingsColorText'
                    value={this.state.cardColor1}
                    onChange={this.handleChange}
                  ></textarea>
                </div>
                <div className='settingsColor'>
                  <div
                    className='settingsColorPreview'
                    style={{ background: this.state.cardColor2 }}
                  ></div>
                  <textarea
                    name='cardColor2'
                    rows='1'
                    cols='10'
                    maxLength='7'
                    className='settingsColorText'
                    value={this.state.cardColor2}
                    onChange={this.handleChange}
                  ></textarea>
                </div>
                <div className='settingsDropdown'>
                  <select
                    name='cardAngle'
                    className='settingsSelect'
                    defaultValue='45deg'
                    onChange={this.handleChange}
                  >
                    <option value='90deg'>Horizontal</option>
                    <option value='180deg'>Vertical</option>
                    <option value='45deg'>Diagonal A</option>
                    <option value='-45deg'>Diagonal B</option>
                  </select>
                </div>
              </div>
            </div>
            {/* </div>
          <div className='settingsSection'> */}
            <div className='settingsName'>Miscellaneous</div>
            <div className='settingsLeft'>
              <div className='settingsMisc'>
                <span className='settingsMiscText'>Text</span>
                <div className='settingsColor'>
                  <div
                    className='settingsColorPreview'
                    style={{ background: this.state.textColor }}
                  ></div>
                  <textarea
                    name='textColor'
                    rows='1'
                    cols='10'
                    maxLength='7'
                    className='settingsColorText'
                    value={this.state.textColor}
                    onChange={this.handleChange}
                  ></textarea>
                </div>
              </div>
              <div className='settingsMisc'>
                <span className='settingsMiscText'>Socials</span>
                <div className='settingsColor'>
                  <div
                    className='settingsColorPreview'
                    style={{ background: this.state.socialColor }}
                  ></div>
                  <textarea
                    name='socialColor'
                    rows='1'
                    cols='10'
                    maxLength='7'
                    className='settingsColorText'
                    value={this.state.socialColor}
                    onChange={this.handleChange}
                  ></textarea>
                </div>
              </div>
              <div className='settingsMisc'>
                <span className='settingsMiscText'>Borders</span>
                <div className='settingsColor'>
                  <div
                    className='settingsColorPreview'
                    style={{ background: this.state.borderColor }}
                  ></div>
                  <textarea
                    name='borderColor'
                    rows='1'
                    cols='10'
                    maxLength='7'
                    className='settingsColorText'
                    value={this.state.borderColor}
                    onChange={this.handleChange}
                  ></textarea>
                </div>
              </div>
            </div>
            {/* </div>
          <div className='settingsSection'> */}
            <div
              className='settingsButton'
              style={{ margin: 'auto' }}
              onClick={this.saveSettings}
            >
              Save
            </div>
          </div>
          <div className='settingsSection'>
            <div className='settingsName'>Danger Zone</div>
            <div
              className='settingsButton settingsButtonRed'
              style={{ margin: 'auto' }}
              onClick={this.deleteAccount}
            >
              Delete Account
            </div>
          </div>
        </div>
        <Footer />
        <div className={`settingsStatus ${settingsStatus}`}>
          {statusMessage}
        </div>
      </div>
    );
  }
}

export default MySettings;
