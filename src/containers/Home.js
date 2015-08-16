import React, { Component } from 'react';
import { Link } from 'react-router';
import { head } from './utils';

export default class Home extends Component {
  render() {
    return (
      <div>
        {head()}
        <img src="http://satsukita-andon.com/assets/img/logo.png" />
        <Link to="/info">Info</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/howto">Howto</Link>
      </div>
    );
  }
}
