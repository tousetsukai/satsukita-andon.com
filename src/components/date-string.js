import React from 'react';

export default class DateString extends React.Component {
  static propTypes = {
    date: React.PropTypes.string.isRequired,
  };
  render() {
    const { date, ...others } = this.props;
    const d = new Date(date);
    return <span {...others}>{d.toLocaleString()}</span>;
  }
}
