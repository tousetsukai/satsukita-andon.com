import React, { Component } from 'react';
import Helmet from 'react-helmet';

class About extends Component {
  static fetchData({ params, store }) {
    return Promise.resolve('aobut');
  }

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
