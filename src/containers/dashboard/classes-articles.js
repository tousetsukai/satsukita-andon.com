import React, { Component } from 'react';
import { connect } from 'react-redux';

class Hoge extends Component {
  render() {
    return (
      <div>
        hoge
      </div>
    );
  }
}

export default connect(
  state => ({
  })
)(Hoge);
