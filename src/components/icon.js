import React, { Component } from 'react';

import useSheet from '../jss';

export const size = 36;

const sheet = {
  icon: {
    width: size,
    height: size,
    'border-radius': size / 2,
  },
};

class Icon extends Component {

  static propTypes = {
    user: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      login: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      icon_url: React.PropTypes.string,
    }).isRequired,
    sheet: React.PropTypes.object.isRequired,
  }

  render() {
    const { sheet, user } = this.props;
    const { classes } = sheet;
    const icon = user.icon_url ? user.icon_url : '/static/img/no-icon.svg';
    return (
      <img className={classes.icon} src={icon} alt={user.name}/>
    );
  }
}

export default useSheet(Icon, sheet);
