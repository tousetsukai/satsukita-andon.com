import React, { Component } from 'react';

export default class UserDropdown extends Component {
  render() {
    const { user } = this.props;
    if (typeof user.id === 'undefined') {
      return (
        <div>
          <p>登録</p>
          <p>ログイン</p>
        </div>
      );
    } else {
      return (
        <div>
          <img src={user.icon_url}/>
          <p>{user.name}</p>
        </div>
      );
    }
  }
}
