import React from 'react';

export default class Loader extends React.Component {
  render() {
    return (
      <div className="loader-wrapper">
        <div>
          <div className="loader">Loading...</div>
        </div>
      </div>
    );
  }
}
