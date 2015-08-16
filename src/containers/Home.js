import React, { Component } from 'react';
import { Link } from 'react-router';
import helmetTemplate from '../utils/helmetTemplate';

export default class Home extends Component {
  render() {
    return (
      <div>
        {helmetTemplate()}
        <img src="http://satsukita-andon.com/assets/img/logo.png" />
        <Link to="/info">Info</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/howto">Howto</Link>
      </div>
    );
  }
}
