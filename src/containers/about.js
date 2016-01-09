import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import _ from 'lodash';
import Remarkable from 'remarkable';

import { loading, getFixedContent } from '../actions';
import { meta } from '../util/helmet';

class About extends Component {

  static fetchData = ({ dispatch }) => {
    return dispatch(loading(getFixedContent('about')));
  };

  componentWillMount = () => {
    if (_.isEmpty(this.props.about)) {
      return About.fetchData({ dispatch: this.props.dispatch });
    }
  };

  render() {
    const md = new Remarkable({
      html: true,
      linkify: true,
    });
    return (
      <div className="container padding-container">
        <Helmet title="About"
                meta={meta('About', '行灯職人への道について')}
        />
        <article dangerouslySetInnerHTML={{__html: md.render(this.props.about.body)}}></article>
      </div>
    );
  }
}

export default connect(
  state => ({
    about: state.contents.about,
  })
)(About);
