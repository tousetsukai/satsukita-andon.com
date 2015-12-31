import React, { Component } from 'react';
import { Link } from 'react-router';

import useSheet from '../jss';
import UserDropdown from './user-dropdown';

export const headerHeight = 50;
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
      'background-color': 'rgba(0, 0, 0, 0.9)',
    },
  },
  nav: {
    margin: 'auto',
    '& ul': {
      display: 'flex',
    },
  },
  logo: {
    margin: `${logoMargin}px 0 ${logoMargin}px`,
    height: `${headerHeight - logoMargin * 2}px`,
  },
  menu: {
    'font-size': `${headerHeight / 3}px`,
    color: '#eeeeee',
    'text-decoration': 'none',
    display: 'box',
    'margin-top': `${headerHeight / 3}px`,
    'margin-left': '30px',
  },
  '@media (min-width: 1024px)': {
    nav: {
      width: '1024px',
    },
  },
};

class Header extends Component {
  render() {
    const { sheet, user } = this.props;
    const { classes } = sheet;
    return (
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
            <li><UserDropdown user={user}/></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default useSheet(Header, sheet);
