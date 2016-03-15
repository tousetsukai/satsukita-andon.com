import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

class Home extends Component {

  render() {
    return (
      <div>
        <p>行灯職人への道 管理画面</p>
      </div>
    );
  }
}

export default connect()(Home);
