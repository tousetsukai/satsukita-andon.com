import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import useSheet from '../jss';
import color from '../jss/color';
import size from '../jss/size';
import { ghostButton } from '../jss/util';
import UserDropdown from './user-dropdown';

const logoMargin = 3;

const sheet = {
  header: {
    'background-color': 'rgba(0, 0, 0, 0.6)',
    transition: '0.1s linear',
    height: size.headerHeight,
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    'box-shadow': '0 0 3px 3px rgba(0, 0, 0, 1)',
    '&:hover': {
      'background-color': 'rgba(0, 0, 0, 0.9)',
    },
  },
  wrapper: {
    margin: 'auto',
    padding: '0 8px',
    display: 'flex',
    'justify-content': 'space-between',
  },
  navUl: {
    display: 'flex',
    'align-items': 'center',
    height: size.headerHeight,
    '& h1': { // to reset elemental.css
      'font-size': 0,
      margin: 0,
    },
  },
  logo: {
    height: size.headerHeight - logoMargin * 2,
  },
  menu: {
    'font-size': size.headerHeight / 3,
    color: color.text,
    'text-decoration': 'none',
    'margin-left': 30,
    '&:hover, &:focus': {
      'text-decoration': 'none',
      color: color.theme,
    },
  },
  right: {
    display: 'flex',
    'align-items': 'center',
    height: size.headerHeight,
  },
  button: {
    ...ghostButton(color.green, color.text),
    'font-size': size.headerHeight / 3.4,
    'margin-left': 20,
  },
  search: {
    'margin-right': 30,
  },
  '@media (min-width: 1024px)': {
    wrapper: {
      width: '1024px',
    },
  },
};

class Header extends Component {

  static contextTypes = {
    user: React.PropTypes.object,
  }

  signupOrUser() {
    const { sheet } = this.props;
    const { classes } = sheet;
    const user = this.context.user;

    if (_.isEmpty(user)) {
      return [
        <Link key={0} className={classes.button} to="/signup">新規登録</Link>,
        <Link key={1} className={classes.button} to="/signin">ログイン</Link>,
      ];
    } else {
      return <UserDropdown/>;
    }
  }

  render() {
    const { sheet } = this.props;
    const { classes } = sheet;

    return (
      <header className={classes.header}>
        <div className={classes.wrapper}>
          <nav>
            <ul className={classes.navUl}>
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
          <div className={classes.right}>
            {this.signupOrUser()}
          </div>
        </div>
      </header>
    );
  }
}

export default useSheet(Header, sheet);
