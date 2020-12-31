import React from 'react';
import axios from 'axios';

import Header from '../Header.js';
import MySocial from './MySocial.js';
import Footer from '../../Footer.js';

import './styles.css';

import defaultImg from '../../../images/digitalia.PNG';

const server = 'http://localhost:5000';

class MySettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: '',
      userImg: 'none',
      bgColor1: '#d4bec0',
      bgColor2: '#a2c6ca',
      bgAngle: '45deg',
      bgImg: 'none',
      bgChoice: '2',
      cardColor1: '#f8f8f5',
      cardColor2: '#f8f8f5',
      cardAngle: '45deg',
      cardImg: 'none',
      cardChoice: '2',
      textColor: '#5f5d54',
      borderColor: '#929b94',
      socialColor: '#f2f3ef',
      socials: [],
    };
  }

  handleChange = (event) => {
    const target = event.target;
    this.setState({ [target.name]: target.value, status: '' });
  };

  cardSelect = (event) => {
    const card = event.target.id;
    const name = card.slice(0, -1);
    const choice = card.slice(-1);

    this.setState({ [name]: choice, status: '' });
  };

  imageUpload = (event) => {
    const name = event.target.id;
    const files = Array.from(event.target.files);
    const image = files[0];

    const formats = [
      'image/bmp',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/tiff',
    ];

    // Perform test to filter unwanted images

    if (formats.some((format) => image.type.includes(format))) {
      this.setState({ status: 'Saving' });
      const formData = new FormData();
      formData.append(name, image);

      axios
        .post(`${server}/admin/uploadImage`, formData, {
          withCredentials: true,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
          },
        })
        .then((res) => {
          this.setState({ [name]: res.data.url, status: '' });
        })
        .catch(() => {
          this.setState({ status: 'Error' });
        });
    } else {
      this.setState({ status: 'Invalid File' });
    }
  };

  deleteImage = () => {
    this.setState({ status: 'Saving' });
    axios
      .get(`${server}/admin/deleteImage`, {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      })
      .then((res) => {
        if (res.data.status === 'Okay') {
          this.setState({ userImg: '', status: '' });
        } else {
          this.setState({ status: 'Oops' });
        }
      })
      .catch(() => {
        this.setState({ status: 'Oops' });
      });
  };

  addSocial = () => {
    this.setState({ status: '' });
    const socials = this.state.socials;

    if (socials.length < 6) {
      if (socials === []) {
        const newSocials = this.state.socials.push({ name: '', uid: '' });
        this.setState({ socials: newSocials });
      } else if (
        !socials.some((social) => social.uid === '') &&
        !socials.some((social) => social.name === '')
      ) {
        const newSocials = [...this.state.socials, { name: '', uid: '' }];
        this.setState({ socials: newSocials });
      } else {
        this.setState({ status: 'Fill Socials First' });
      }
    } else {
      this.setState({ status: 'Max Reached' });
    }
  };

  updateSocial = (event) => {
    const target = event.target;
    const id = target.name.split('_');
    const platform = id[1];
    const field = id[0];

    const socials = this.state.socials;
    const social = socials[platform];
    social[field] = target.value;
    socials.splice(platform, 1, social);

    this.setState({ socials: socials });
  };

  deleteSocial = (event) => {
    this.setState({ status: '' });
    const target = event.target;

    const socials = this.state.socials;
    socials.splice(target.id, 1);

    this.setState({ socials: socials });
  };

  saveSocial = () => {
    this.setState({ status: 'Saving' });

    const socials = this.state.socials;
    if (
      !socials.some((social) => social.uid === '') &&
      !socials.some((social) => social.name === '')
    ) {
      axios
        .post(`${server}/admin/saveSocials`, this.state.socials, {
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
    } else {
      this.setState({ status: 'Fill Socials First' });
    }
  };

  saveSettings = () => {
    this.setState({ status: 'Saving' });

    axios
      .post(`${server}/admin/saveSettings`, this.state, {
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
    this.setState({ status: 'Saving' });
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
          this.setState({ status: '' });
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
          this.setState(data);
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
      case 'Fill Socials First':
      case 'Max Reached':
      case 'Invalid Color':
      case 'Invalid File':
        statusMessage = (
          <div>
            <i className='fas fa-times'></i>
            <span style={{ marginLeft: '10px' }}>{this.state.status}</span>
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
    }

    const userImg = this.state.userImg === '' ? defaultImg : this.state.userImg;
    const bgImage = `url(${this.state.bgImg})`;
    const cardImage = `url(${this.state.cardImg})`;

    const socials = this.state.socials.map((social, i) => {
      return (
        <MySocial
          key={i}
          num={i}
          platform={social.name}
          uid={social.uid}
          deleteSocial={this.deleteSocial}
          updateSocial={this.updateSocial}
        />
      );
    });

    return (
      <div className='main'>
        <Header
          userImg={userImg}
          name={this.props.user.username}
          handleLogout={this.props.handleLogout}
          calledFrom='MySettings'
        />
        <div className='settings'>
          <div className='settingsSection'>
            <div className='settingsH'>
              <img className='adminImage' src={userImg} alt='User' />
              <label className='settingsButton' onChange={this.imageUpload}>
                <input
                  id='userImg'
                  type='file'
                  accept='.bmp,.jpeg,.jpg,.png,.tiff'
                  style={{ display: 'none' }}
                />
                Upload
              </label>
              <div
                className='settingsButton settingsButtonRed'
                onClick={this.deleteImage}
              >
                Remove
              </div>
            </div>
          </div>
          <div className='settingsSection'>
            <div className='settingsName'>Socials</div>
            <div className='settingsV' style={{ marginBottom: '0px' }}>
              <div className='settingsSocials'>{socials}</div>
              <div className='settingsH'>
                <div className='settingsButton' onClick={this.addSocial}>
                  Add
                </div>
                <div className='settingsButton' onClick={this.saveSocial}>
                  Save
                </div>
              </div>
            </div>
          </div>
          <div className='settingsSection'>
            <div className='settingsName'>Background</div>
            <div className='settingsV'>
              <div className='settingsH'>
                <div
                  id='bgChoice1'
                  className='settingsCard settingsBgCard'
                  style={{ background: this.state.bgColor1 }}
                  onClick={this.cardSelect}
                >
                  <i
                    className={`fas fa-check ${
                      this.state.bgChoice === '1'
                        ? 'settingsCardYes'
                        : 'settingsCardNo'
                    }`}
                  ></i>
                </div>
                <div
                  id='bgChoice2'
                  className='settingsCard settingsBgCard'
                  style={{
                    background: `linear-gradient(
                        ${this.state.bgAngle},
                        ${this.state.bgColor1} 0%,
                        ${this.state.bgColor2} 100%
                      )`,
                  }}
                  onClick={this.cardSelect}
                >
                  <i
                    className={`fas fa-check ${
                      this.state.bgChoice === '2'
                        ? 'settingsCardYes'
                        : 'settingsCardNo'
                    }`}
                  ></i>
                </div>
                <label
                  id='bgChoice3'
                  className='settingsCard settingsBgCard settingsCardImage'
                  style={{
                    backgroundImage: bgImage,
                  }}
                  onClick={this.cardSelect}
                  onChange={this.imageUpload}
                >
                  <input id='bgImg' type='file' style={{ display: 'none' }} />
                  <i
                    className={`far fa-image ${
                      this.state.bgChoice === '3'
                        ? 'settingsImageIconNo'
                        : 'settingsImageIconYes'
                    }`}
                  ></i>
                  <i
                    className={`fas fa-check ${
                      this.state.bgChoice === '3'
                        ? 'settingsCardYes'
                        : 'settingsCardNo'
                    }`}
                  ></i>
                </label>
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
                    value={this.state.bgAngle}
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
                  id='cardChoice1'
                  className={`settingsCard settingsCardCard`}
                  style={{ background: this.state.cardColor1 }}
                  onClick={this.cardSelect}
                >
                  <i
                    className={`fas fa-check ${
                      this.state.cardChoice === '1'
                        ? 'settingsCardYes'
                        : 'settingsCardNo'
                    }`}
                  ></i>
                </div>
                <div
                  id='cardChoice2'
                  className={`settingsCard settingsCardCard`}
                  style={{
                    background: `linear-gradient(
                        ${this.state.cardAngle},
                        ${this.state.cardColor1} 0%,
                        ${this.state.cardColor2} 100%
                      )`,
                  }}
                  onClick={this.cardSelect}
                >
                  <i
                    className={`fas fa-check ${
                      this.state.cardChoice === '2'
                        ? 'settingsCardYes'
                        : 'settingsCardNo'
                    }`}
                  ></i>
                </div>
                <label
                  id='cardChoice3'
                  className={`settingsCard settingsCardCard settingsCardImage`}
                  onClick={this.cardSelect}
                  onChange={this.imageUpload}
                  style={{
                    backgroundImage: cardImage,
                  }}
                >
                  <input id='cardImg' type='file' style={{ display: 'none' }} />
                  <i
                    className={`far fa-image ${
                      this.state.cardChoice === '3'
                        ? 'settingsImageIconNo'
                        : 'settingsImageIconYes'
                    }`}
                  ></i>
                  <i
                    className={`fas fa-check ${
                      this.state.cardChoice === '3'
                        ? 'settingsCardYes'
                        : 'settingsCardNo'
                    }`}
                  ></i>
                </label>
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
                    value={this.state.cardAngle}
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
