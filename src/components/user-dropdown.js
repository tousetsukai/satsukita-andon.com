import React, { Component } from 'react';

import useSheet from '../jss';
import Icon, { size as iconSize } from './icon';

export const height = iconSize;

const sheet = {
  wrapper: {
    display: 'flex',
    height: iconSize,
  },
  name: {
    'font-size': 12,
    'margin-top': (iconSize - 12) / 2,
    'margin-left': 12,
  },
};

class UserDropdown extends Component {
  render() {
    const { sheet, user } = this.props;
    const { classes } = sheet;
    return (
      <div className={classes.wrapper}>
        <Icon className={classes.icon} user={user}/>
        <p className={classes.name}>{user.name}</p>
      </div>
    );
  }
}

export default useSheet(UserDropdown, sheet);
