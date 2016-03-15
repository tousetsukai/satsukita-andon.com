import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

class Home extends Component {

  render() {
    return (
      <div className="container padding-container">
        <p>dashboard</p>
      </div>
    );
  }
}

export default connect()(Home);
