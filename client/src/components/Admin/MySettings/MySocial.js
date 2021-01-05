import React from 'react';

class MySocial extends React.Component {
  render() {
    return (
      <div className='settingsSocial'>
        <select
          name={`name_${this.props.num}`}
          className='settingsSocialSelect'
          value={this.props.platform}
          onChange={this.props.updateSocial}
        >
          <option style={{ display: 'none' }} value=''>
            Platform
          </option>
          <option value='discord.gg'>Discord</option>
          <option value='facebook.com'>Facebook</option>
          <option value='github.com'>Github</option>
          <option value='instagram.com'>Instagram</option>
          <option value='patreon.com'>Patreon</option>
          <option value='pinterest.com'>Pinterest</option>
          <option value='spotify.com'>Spotify</option>
          <option value='tiktok.com'>TikTok</option>
          <option value='twitch.tv'>Twitch</option>
          <option value='twitter.com'>Twitter</option>
          <option value='vimeo.com'>Vimeo</option>
          <option value='youtube.com'>YouTube</option>
        </select>
        <input
          type='text'
          name={`uid_${this.props.num}`}
          rows='1'
          cols='30'
          className='settingsSocialId'
          placeholder='Username/ID'
          value={this.props.uid}
          onChange={this.props.updateSocial}
        ></input>
        <i
          id={this.props.num}
          className='far fa-trash-alt settingsSocialDelete'
          onClick={this.props.deleteSocial}
        ></i>
      </div>
    );
  }
}

export default MySocial;
