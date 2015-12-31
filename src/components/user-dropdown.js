import React, { Component } from 'react';

import useSheet from '../jss';
import Icon, { size as iconSize } from './icon';

export const height = iconSize;
export const fontSize = 14;

const sheet = {
  wrapper: {
    display: 'flex',
    'align-items': 'center',
    height: iconSize,
  },
  name: {
    'font-size': fontSize,
    'margin-left': 10,
  },
};

class UserDropdown extends Component {
  render() {
    const { sheet, user } = this.props;
    const { classes } = sheet;
    return (
      <div className={classes.wrapper}>
        <Icon className={classes.icon} user={user}/>
        <p className={classes.name}>
          {user.name}
          &nbsp;<i className="fa fa-caret-down"></i>
        </p>
      </div>
    );
  }
}

export default useSheet(UserDropdown, sheet);
