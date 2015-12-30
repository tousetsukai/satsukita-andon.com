import React, { Component } from 'react';

export default class NotFound extends Component {
  render() {
    const { location } = this.props;
    return (
      <p>Not Found: {location.pathname + location.search}</p>
    );
  }
}
