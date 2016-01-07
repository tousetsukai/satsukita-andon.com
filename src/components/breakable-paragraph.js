import React from 'react';

export default class BreakableParagraph extends React.Component {
  static propTypes = {
    text: React.PropTypes.string.isRequired,
  }
  render() {
    const { text, ...props } = this.props;
    const html = [].concat.apply([], text.split(/\r\n|\n/).map((t, i) => {
      const span = <span key={i}>{t}</span>;
      return i == 0 ? [span] : [<br key={'br-' + i}/>, span];
    }));
    return <p {...props}>{html}</p>;
  }
}
