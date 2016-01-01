import React, { Component } from 'react';
import { Dropdown } from 'elemental';

import useSheet from '../jss';
import Icon, { size as iconSize } from './icon';

export const height = iconSize;
export const fontSize = 14;

const sheet = {
  wrapper: {
    display: 'flex',
    'align-items': 'center',
    height: iconSize,
    cursor: 'pointer',
  },
  name: {
    'font-size': fontSize,
    'margin-left': 10,
  },
};

class UserDropdown extends Component {

  static contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object,
    user: React.PropTypes.object,
  }

  logout = () => {
    return this.context.store.dispatch((dispatch) => {
      return dispatch({ type: 'app:user:set', user: {} });
    });
  }

  onSelect = (v) => {
    switch (v.type) {
    case 'link':
      return this.context.router.push(v.url);
    case 'logout':
      return this.logout();
    default:
      return console.error(`${v.type} is not defined`); // eslint-disable-line no-console
    }
  }

  render() {
    const { sheet } = this.props;
    const { classes } = sheet;
    const user = this.context.user;
    const icon = (
      <div className={classes.wrapper}>
        <Icon className={classes.icon} user={user}/>
        <p className={classes.name}>
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

export default useSheet(UserDropdown, sheet);
