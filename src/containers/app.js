import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

export default class App extends Component {
  render() {
    return (
      <div>
        <Helmet
          titleTemplate="%s - 行灯職人への道"
        />
        <nav>
          <ul>
            <li><Link to="/">Top</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
          </ul>
        </nav>
        {this.props.children}
      </div>
    );
  }
}
