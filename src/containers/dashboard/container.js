import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';

class Container extends Component {

  render() {
    const { user } = this.props;
    if (_.isEmpty(user)) {
      // not logged in
      return (
        <div className="container padding-container">
          <Link to="/signin">ログインしてください</Link>
        </div>
      );
    } else {
      return (
        <div className="container padding-container">
          <ul>
            <li>ここに各種管理項目へのリンク</li>
          </ul>
          {this.props.children}
        </div>
      );
    }
  }
}

export default connect(
  state => ({
    user: state.app.user,
  })
)(Container);
