import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

import useSheet from '../jss';

const sheet = {
  header: {
    'background-color': 'rgba(0, 0, 0, 0.7)',
    'border-radius': '2px'
  }
};

class App extends Component {
  render() {
    const { classes } = this.props.sheet;
    return (
      <div>
        <Helmet
          titleTemplate="%s - 行灯職人への道"
        />
        <header className={classes.header}>
          <nav>
            <ul>
              <li>
                <h1>
                  <Link to="/">
                    <img src="/static/img/logo.png"/>
                  </Link>
                </h1>
              </li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/howto">How to</Link></li>
            </ul>
          </nav>
        </header>
        {this.props.children}
      </div>
    );
  }
}

export default useSheet(App, sheet);
