import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

import useSheet from '../jss';

const headerHeight = 50;
const logoMargin = 3;

const sheet = {
  header: {
    'background-color': 'rgba(0, 0, 0, 0.6)',
    transition: 'background-color 0.1s linear',
    height: `${headerHeight}px`,
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    'box-shadow': '0 0 10px 3px rgba(0, 0, 0, 1)',
    '&:hover': {
      'background-color': 'rgba(0, 0, 0, 0.9)'
    }
  },
  nav: {
    margin: 'auto',
    '& ul': {
      display: 'flex'
    }
  },
  logo: {
    margin: `${logoMargin}px 0 ${logoMargin}px`,
    height: `${headerHeight - logoMargin * 2}px`
  },
  menu: {
    'font-size': `${headerHeight / 3}px`,
    color: '#eeeeee',
    'text-decoration': 'none',
    display: 'box',
    'margin-top': `${headerHeight / 3}px`,
    'margin-left': '30px',
  },
  container: {
    margin: `${headerHeight + 10}px auto 0`,
  },
  footer: {
  },
  '@media (min-width: 1024px)': {
    nav: {
      width: '1024px',
    },
    container: {
      width: '1024px'
    }
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
          <nav className={classes.nav}>
            <ul>
              <li>
                <h1>
                  <Link to="/">
                    <img className={classes.logo} src="/static/img/logo.png"/>
                  </Link>
                </h1>
              </li>
              <li><Link className={classes.menu} to="/gallery">Gallery</Link></li>
              <li><Link className={classes.menu} to="/howto">How to</Link></li>
            </ul>
          </nav>
        </header>
        <div className={classes.container}>
          {this.props.children}
        </div>
        <footer className={classes.footer}>
        </footer>
      </div>
    );
  }
}

export default useSheet(App, sheet);
