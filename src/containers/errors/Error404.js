import React, { Component } from 'react';
import helmetTemplate from '../../utils/helmetTemplate';

export default class Error404 extends Component {
  render() {
    return (
      <div>
        {helmetTemplate('404 Not Found', '404 Not Found')}
        404
      </div>
    );
  }
}
