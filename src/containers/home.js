import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import _ from 'lodash';
import Remarkable from 'remarkable';

import { loading, getFixedContent } from '../actions';

class Home extends Component {

  static fetchData({ dispatch }) {
    return dispatch(loading(getFixedContent('news')));
  }

  componentWillMount() {
    if (_.isEmpty(this.props.topNews)) {
      Home.fetchData({ dispatch: this.props.dispatch });
    }
  }

  render() {
    const { topNews } = this.props;
    const md = new Remarkable({
      html: true,
      linkify: true,
    });
    return (
      <div className="padding-container">
        <Helmet
          title="行灯職人への道"
          titleTemplate="%s"
        />
        <div className="home-logo-wrapper">
          <span className="home-logo-helper"/>
          <img className="home-logo" src="/static/img/logo.png"/>
        </div>
        <h3>News</h3>
        <article dangerouslySetInnerHTML={{__html: md.render(topNews.body)}}></article>
      </div>
    );
  }
}

export default connect(
  state => ({
    topNews: state.contents.news,
  })
)(Home);
