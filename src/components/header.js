import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import UserDropdown from './user-dropdown';

class Header extends Component {

  static contextTypes = {
    user: React.PropTypes.object,
  }

  signupOrUser() {
    const user = this.context.user;

    if (_.isEmpty(user)) {
      return [
        <Link key={0} className="menu-button" to="/signup">新規登録</Link>,
        <Link key={1} className="menu-button" to="/signin">ログイン</Link>,
      ];
    } else {
      return <UserDropdown/>;
    }
  }

  render() {
    return (
      <header className="header">
        <div className="header-wrapper">
          <nav>
            <ul className="header-left">
              <li>
                <h1>
                  <Link to="/">
                    <img className="logo" src="/static/img/logo.png"/>
                  </Link>
                </h1>
              </li>
              <li><Link className="menu-link" to="/gallery">Gallery</Link></li>
              <li><Link className="menu-link" to="/howto">How to</Link></li>
            </ul>
          </nav>
          <div className="header-right">
            {this.signupOrUser()}
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
