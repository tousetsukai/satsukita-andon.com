import React, { Component } from 'react';
import { Dropdown } from 'elemental';
import Cookies from 'js-cookie';

import Icon from './icon';

class UserDropdown extends Component {

  static contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object,
    user: React.PropTypes.object,
  };

  logout = () => {
    return this.context.store.dispatch((dispatch) => {
      dispatch({ type: 'app:user:set', user: {} });
      Cookies.remove('token');
    });
  };

  onSelect = (v) => {
    switch (v.type) {
    case 'link':
      return this.context.router.push(v.url);
    case 'logout':
      return this.logout();
    default:
      return console.error(`${v.type} is not defined`); // eslint-disable-line no-console
    }
  };

  render() {
    const user = this.context.user;
    const icon = (
      <div className="user-dropdown">
        <Icon user={user}/>
        <p className="name">
          {user.name}
          &nbsp;<i className="fa fa-caret-down"></i>
        </p>
      </div>
    );
    const items = [
      { label: 'プロフィール', value: { type: 'link', url: `/users/${user.login}` } },
      { type: 'divider' },
      { label: '設定', value: { type: 'link', url: '/settings' } },
      { label: 'ログアウト', value: { type: 'logout' } },
    ];
    return <Dropdown items={items} onSelect={this.onSelect} alignRight={true}>{icon}</Dropdown>;
  }
}

export default UserDropdown;
