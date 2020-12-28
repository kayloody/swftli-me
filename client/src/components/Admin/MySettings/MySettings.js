import React from 'react';

import Header from '../Header.js';
import Footer from '../../Footer.js';

import './styles.css';

import defaultImg from '../../../images/digitalia.PNG';

class MySettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userImg: defaultImg,
      bgColor1: '#d4bec0',
      bgColor2: '#a2c6ca',
      bgAngle: 3,
      bgImage: '',
      cardColor1: '#f8f8f5',
      cardColor2: '#f8f8f5',
      cardAngle: 3,
      cardImage: '',
      borderColor: '#929b94',
      socialColor: '#f2f3ef',
    };
  }

  componentDidMount() {}

  render() {
    const userImg =
      this.props.user.userImg === ''
        ? this.state.userImg
        : this.props.user.userImg;
    return (
      <div className='main'>
        <Header
          userImg={this.props.user.userImg}
          name={this.props.user.username}
          handleLogout={this.props.handleLogout}
          calledFrom='MySettings'
        />
        <div className='settings'>
          <div className='settingsSection'>
            <div className='settingsH'>
              <img className='adminImage' src={userImg} alt='User' />
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
                <div className='settingsCard settingsBgCard'></div>
                <div className='settingsCard settingsBgCard'></div>
                <div className='settingsCard settingsBgCard'></div>
              </div>
              <div className='settingsH'>
                <div className='settingsColor'>
                  <div className='settingsColorPreview'></div>
                  <textarea
                    name='bgColor1'
                    rows='1'
                    cols='10'
                    maxLength='7'
                    className='settingsColorText'
                    value='#d4bec0'
                  ></textarea>
                </div>
                <div className='settingsColor'>
                  <div className='settingsColorPreview'></div>
                  <textarea
                    name='bgColor2'
                    rows='1'
                    cols='10'
                    maxLength='7'
                    className='settingsColorText'
                    value='#a2c6ca'
                  ></textarea>
                </div>
                <div className='settingsDropdown'>
                  <select className='settingsSelect'>
                    <option value='0'>Horizontal</option>
                    <option value='1'>Vertical</option>
                    <option value='2'>Diagonal Left</option>
                    <option selected value='3'>
                      Diagonal Right
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className='settingsSection'>
            <div className='settingsName'>Buttons</div>
            <div className='settingsV'>
              <div className='settingsH'>
                <div className='settingsCard settingsCardCard'></div>
                <div className='settingsCard settingsCardCard'></div>
                <div className='settingsCard settingsCardCard'></div>
              </div>
              <div className='settingsH'>
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
                <div className='settingsColor'>
                  <div className='settingsColorPreview'></div>
                  <textarea
                    name='cardColor2'
                    rows='1'
                    cols='10'
                    maxLength='7'
                    className='settingsColorText'
                    value='#a2c6ca'
                  ></textarea>
                </div>
                <div className='settingsDropdown'>
                  <select className='settingsSelect'>
                    <option value='0'>Horizontal</option>
                    <option value='1'>Vertical</option>
                    <option value='2'>Diagonal Left</option>
                    <option selected value='3'>
                      Diagonal Right
                    </option>
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
