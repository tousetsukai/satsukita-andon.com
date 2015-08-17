import React, { Component } from 'react';
import { head } from './utils';

export default class NotFound extends Component {
  render() {
    return (
      <div>
        {head({ title: '404 Not Found', description: '404 Not Found' })}
        404
      </div>
    );
  }
}
