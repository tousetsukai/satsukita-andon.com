import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import Markdown from '../components/markdown';
import { loading, getFixedContent } from '../actions';
import { meta } from '../util/helmet';

class About extends Component {

  static fetchData = ({ dispatch }) => {
    return dispatch(loading(getFixedContent('about')));
  };

  componentWillMount = () => {
    if (this.props.rendered) {
      return About.fetchData({ dispatch: this.props.dispatch });
    }
  };

  render() {
    return (
      <div className="container padding-container">
        <Helmet title="About"
                meta={meta('About', '行灯職人への道について')}
        />
        <Markdown md={this.props.about.body}/>
      </div>
    );
  }
}

export default connect(
  state => ({
    about: state.contents.about,
    rendered: state.app.rendered,
  })
)(About);
