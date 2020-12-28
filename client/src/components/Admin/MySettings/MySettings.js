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
      userImg: defaultImg,
      bgColor1: '#d4bec0',
      bgColor2: '#a2c6ca',
      bgAngle: '45deg',
      bgImage: '',
      bgChoice: '2',
      cardColor1: '#f8f8f5',
      cardColor2: '#f8f8f5',
      cardAngle: '45deg',
      cardImage: '',
      cardChoice: '2',
      borderColor: '#929b94',
      socialColor: '#f2f3ef',
    };
  }

  handleChange = (event) => {
    const target = event.target;
    console.log(event);
    this.setState({ [target.name]: target.value });
  };

  deleteAccount = () => {
    axios
      .post(
        `${server}/admin/delete`,
        { username: this.state.username, password: this.state.password },
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
                  style={{ background: this.state.bgColor2 }}
                >
                  <i class='far fa-image settingsImageIcon'></i>
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
                    onChange={this.handleChange}
                  >
                    <option value='90deg'>Horizontal</option>
                    <option value='180deg'>Vertical</option>
                    <option selected value='45deg'>
                      Diagonal A
                    </option>
                    <option value='-45deg'>Diagonal B</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className='settingsSection'>
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
                <div className='settingsCard settingsCardCard'></div>
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
                    onChange={this.handleChange}
                  >
                    <option value='90deg'>Horizontal</option>
                    <option value='180deg'>Vertical</option>
                    <option selected value='45deg'>
                      Diagonal A
                    </option>
                    <option value='-45deg'>Diagonal B</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className='settingsSection'>
            <div className='settingsName'>Miscellaneous</div>
            <div className='settingsLeft'>
              <div className='settingsMisc'>
                <span className='settingsMiscText'>Text</span>
                <div className='settingsColor'>
                  <div className='settingsColorPreview'></div>
                  <textarea
                    name='cardColor1'
                    rows='1'
                    cols='10'
                    maxLength='7'
                    className='settingsColorText'
                    value='#d4bec0'
                  ></textarea>
                </div>
              </div>
              <div className='settingsMisc'>
                <span className='settingsMiscText'>Socials</span>
                <div className='settingsColor'>
                  <div className='settingsColorPreview'></div>
                  <textarea
                    name='cardColor1'
                    rows='1'
                    cols='10'
                    maxLength='7'
                    className='settingsColorText'
                    value='#d4bec0'
                  ></textarea>
                </div>
              </div>
              <div className='settingsMisc'>
                <span className='settingsMiscText'>Borders</span>
                <div className='settingsColor'>
                  <div className='settingsColorPreview'></div>
                  <textarea
                    name='cardColor1'
                    rows='1'
                    cols='10'
                    maxLength='7'
                    className='settingsColorText'
                    value='#d4bec0'
                  ></textarea>
                </div>
              </div>
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
      </div>
    );
  }
}

export default MySettings;
