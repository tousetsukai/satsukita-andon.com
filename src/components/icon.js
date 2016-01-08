import React, { Component } from 'react';

class Icon extends Component {

  static propTypes = {
    user: React.PropTypes.shape({
      name: React.PropTypes.string,
      icon_url: React.PropTypes.string,
    }).isRequired,
  }

  render() {
    const { user } = this.props;
    const icon = user.icon_url ? user.icon_url : '/static/img/no-icon.svg';
    return (
      <img className="icon" src={icon} alt={user.name}/>
    );
  }
}

export default Icon;
