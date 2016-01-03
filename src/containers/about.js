import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import _ from 'lodash';

import { loading, getFixedContent } from '../actions';

class About extends Component {

  static fetchData = ({ dispatch }) => {
    return dispatch(loading(getFixedContent('about')));
  }

  componentWillMount = () => {
    if (_.isEmpty(this.props.about)) {
      return About.fetchData({ dispatch: this.props.dispatch });
    }
  }

  render() {
    return (
      <div>
        <Helmet
          title="About"
        />
        <p>{this.props.about.body}</p>
      </div>
    );
  }
}

export default connect(
  state => ({
    about: state.contents.about,
  })
)(About);
