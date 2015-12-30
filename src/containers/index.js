import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class App extends Component {
  render() {
    return (
      <div>
        <Helmet
          titleTemplate="%s - 行灯職人への道"
        />
        <p>Hello, World!</p>
        {this.props.children}
      </div>
    );
  }
}
