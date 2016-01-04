import React, { Component } from 'react';
import { Link } from 'react-router';

class Footer extends Component {

  render() {
    return (
      <footer className="footer">
        <div className="footer-wrapper">
          <ul className="footer-left">
            <li><Link className="footer-link" to="/about">このサイトについて</Link></li>
            <li>|</li>
            <li><Link className="footer-link" to="/contact">お問い合わせ・質問</Link></li>
          </ul>
          <p>copyright &copy; 2002-2016 行灯職人への道</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
