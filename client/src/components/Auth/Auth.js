import React from 'react';

import Header from './Header.js';
import Footer from '../Footer.js';

import './styles.css';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authScreen: 'login' };
  }

  switchAuth = () => {
    this.setState({
      authScreen: this.state.authScreen === 'login' ? 'signup' : 'login',
    });
  };

  render() {
    return (
      <div className='main'>
        <Header />
        <div
          className='authPhone'
          style={
            this.state.authScreen === 'login'
              ? { right: 'calc(750px + 100px)', left: 0 }
              : { right: 0, left: 'calc(750px - 610px)' }
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='350'
            height='585'
            viewBox='0 0 352.568 701.067'
          >
            <g id='Phone' transform='translate(-601.184 -192)'>
              <path
                id='Path_65'
                data-name='Path 65'
                d='M859.293,252.71h-3.885V147.186c0-33.731-27.579-61.075-61.6-61.075H568.324c-34.02,0-61.6,27.344-61.6,61.075V726.1c0,33.731,27.579,61.075,61.6,61.075H793.809c34.02,0,61.6-27.344,61.6-61.075V327.824h3.885Z'
                transform='translate(94.459 105.889)'
                fill='#929b94'
              />
              <path
                id='Path_66'
                data-name='Path 66'
                d='M797.141,102.606H767.67a21.5,21.5,0,0,1-2.1,20.274,21.941,21.941,0,0,1-18.161,9.584H618.066a21.94,21.94,0,0,1-18.16-9.583,21.5,21.5,0,0,1-2.1-20.275H570.279a45.84,45.84,0,0,0-46.06,45.618V726.387A45.84,45.84,0,0,0,570.279,772H797.141a45.841,45.841,0,0,0,46.06-45.618h0V148.224a45.841,45.841,0,0,0-46.06-45.618Z'
                transform='translate(93.758 105.228)'
                fill='#fff'
              />
              <rect
                id='Rectangle_36'
                data-name='Rectangle 36'
                width='262.027'
                height='442.873'
                transform='translate(646.455 321.097)'
                fill='#eef3ef'
              />
              <circle
                id='Ellipse_12'
                data-name='Ellipse 12'
                cx='24.958'
                cy='24.958'
                r='24.958'
                transform='translate(752.898 795.127)'
                fill='#929b94'
              />
            </g>
          </svg>
        </div>
        <div className='authMain'>
          <div
            className='authForm login'
            style={
              this.state.authScreen === 'signup'
                ? { visibility: 'hidden' }
                : { visibility: 'visible' }
            }
          >
            <form>
              <input className='authText' type='text' placeholder='Username' />
              <br />
              <input
                className='authText'
                type='password'
                placeholder='Password'
              />
              <br />
              <input className='authSubmit' type='submit' value='Log In' />
            </form>
            <hr />
            <div id='authGoogle'>
              <i className='fab fa-google' style={{ marginRight: '15px' }}></i>
              Log in with Google
            </div>
            <div className='authSubtext'>Forgot password?</div>
            <hr />
            <div className='authSubtext'>
              Don't have an account?{' '}
              <span className='authSwitch' onClick={this.switchAuth}>
                Sign Up
              </span>
            </div>
          </div>
          <div
            className='authForm signup'
            style={
              this.state.authScreen === 'login'
                ? { visibility: 'hidden' }
                : { visibility: 'visible' }
            }
          >
            <form>
              <input className='authText' type='text' placeholder='Email' />
              <br />
              <input className='authText' type='text' placeholder='Username' />
              <br />
              <input
                className='authText'
                type='password'
                placeholder='Password'
              />
              <br />
              <input className='authSubmit' type='submit' value='Sign Up' />
            </form>
            <hr />
            <div className='authSubtext'>
              Have an account?{' '}
              <span className='authSwitch' onClick={this.switchAuth}>
                Log In
              </span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Auth;
