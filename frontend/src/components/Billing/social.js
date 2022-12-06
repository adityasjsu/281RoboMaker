import React, { Component } from 'react';

import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
} from 'react-share';

export default class App extends Component {
  render() {
    const shareUrl = 'https://www.pakkamarwadi.tk/';
    return (
      <div
        style={{
          background: '#0000',
          height: '100vh',
          width: '100%',
        }}
      >
        <h1>I hope you like it</h1>

        <FacebookShareButton
          url={shareUrl}
          quote={'Title or jo bhi aapko likhna ho'}
          hashtag={'#portfolio...'}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>

        <WhatsappShareButton
          url={shareUrl}
          quote={'Title or jo bhi aapko likhna ho'}
          hashtag={'#portfolio...'}
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
      </div>
    );
  }
}