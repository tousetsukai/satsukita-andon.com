import React, { Component } from 'react';

export default class NotFound extends Component {
  render() {
    const { location } = this.props;
    return (
      <div className="container">
        <p>ページが見つからないか、未実装です: {location.pathname + location.search}</p>
      </div>
    );
  }
}
