import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>行灯職人への道</h1>
        {this.props.children}
      </div>
    );
  }
}
