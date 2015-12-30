import React, { Component } from 'react';
import Helmet from 'react-helmet';

class About extends Component {
  render() {
    return (
      <div>
        <Helmet
          title="About"
        />
        <p>このサイトは。。。</p>
      </div>
    );
  }
}

export default About;
