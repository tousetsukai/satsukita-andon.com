import React, { Component } from 'react';
import { Link } from 'react-router';

class Footer extends Component {

  render() {
    return (
      <footer className="footer">
        <div className="footer-wrapper">
          <p className="footer-left">
            <Link className="footer-link" to="/about">このサイトについて</Link>
            <span className="space">    |    </span>
            <Link className="footer-link" to="/contact">お問い合わせ・質問</Link>
          </p>
          <p>copyright &copy; 2002-2016 行灯職人への道</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
