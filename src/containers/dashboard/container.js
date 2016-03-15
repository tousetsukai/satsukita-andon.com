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
            <li><Link to="/dashboard/articles">記事一覧</Link></li>
            <li><Link to="/dashboard/resources">資料一覧</Link></li>
            <li><Link to="/dashboard/classes">クラス一覧</Link></li>
            <li>--</li>
            <li><Link to="/dashboard/settings">アカウント設定</Link></li>
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
