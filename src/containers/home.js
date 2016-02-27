import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import _ from 'lodash';

import Markdown from '../components/markdown';
import { loading, getFixedContent } from '../actions';

class Home extends Component {

  static fetchData({ dispatch }) {
    return dispatch(loading(getFixedContent('news')));
  }

  state = {
    inJumbotron: true,
  };

  componentWillMount() {
    if (_.isEmpty(this.props.topNews)) {
      Home.fetchData({ dispatch: this.props.dispatch });
    }
  }

  componentDidMount() {
    if (window) {
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  handleScroll = (ev) => {
    const inJumbotron = ev.target.scrollingElement.scrollTop < window.innerHeight;
    this.setState({ inJumbotron });
  };

  render() {
    const { topNews } = this.props;
    return (
      <div>
        <Helmet
          title="行灯職人への道"
          titleTemplate="%s"
        />
        {this.state.inJumbotron && (<style>
          {`.header { background: none !important; box-shadow: none !important; }`}
        </style>)}
        <div className="home-jumbotron">
          <div className="background-image"/>
          <div className="background-gradient"/>
          <img className="jumbotron-logo" src="/static/img/logo.png"/>
        </div>
        <div className="container padding-container">
          <h3>News</h3>
          <Markdown md={topNews.body}/>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    topNews: state.contents.news,
  })
)(Home);
