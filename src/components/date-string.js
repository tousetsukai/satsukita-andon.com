import React from 'react';
import moment from 'moment';

export default class DateString extends React.Component {
  static propTypes = {
    date: React.PropTypes.string.isRequired,
  };
  render() {
    const { date, ...others } = this.props;
    const m = moment(date);
    return <span {...others}>{m.format('YYYY/MM/DD HH:mm')}</span>;
  }
}
