import React, { Component } from 'react';
import { Link } from 'react-router';

import useSheet from '../jss';
import color from '../jss/color';
import size from '../jss/size';

const fontSize = 12;

const sheet = {
  footer: {
    height: size.footerHeight,
    width: '100%',
    'background-color': '#06060a',
    position: 'absolute',
    bottom: '0',
    color: color.gray,
    'font-size': fontSize,
  },
  wrapper: {
    margin: 'auto',
    padding: `${(size.footerHeight - fontSize) / 2}px ${size.padding}px 0`,
    display: 'flex',
    'justify-content': 'space-between',
    'align-items': 'center',
  },
  links: {
    display: 'flex',
    '& li': {
      'list-style-type': 'none',
      'margin-right': 12,
    },
  },
  link: {
    'text-decoration': 'none',
    color: color.gray,
    '&:hover, &:focus': {
      'text-decoration': 'none',
      color: color.theme,
    },
  },
  [`@media (min-width: ${size.pcWidth}px)`]: {
    wrapper: {
      width: size.pcWidth,
    },
  },
};

class Footer extends Component {

  render() {
    const { sheet } = this.props;
    const { classes } = sheet;

    return (
      <footer className={classes.footer}>
        <div className={classes.wrapper}>
          <ul className={classes.links}>
            <li><Link className={classes.link} to="/about">このサイトについて</Link></li>
            <li>|</li>
            <li><Link className={classes.link} to="/contact">お問い合わせ・質問</Link></li>
          </ul>
          <p>copyright &copy; 2002-2016 行灯職人への道</p>
        </div>
      </footer>
    );
  }
}

export default useSheet(Footer, sheet);
