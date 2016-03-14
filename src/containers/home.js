import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import _ from 'lodash';

import Markdown from '../components/markdown';
import { loading, all, getFixedContent, getRandomImages } from '../actions';

class Home extends Component {

  static fetchData({ dispatch }) {
    return dispatch(loading(all([getFixedContent('news'), getRandomImages(20)])));
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
    const { topNews, jumbotronImages } = this.props;
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
          <ul className="background-images">
            {jumbotronImages.map((url, i) =>
              <li key={i} style={{ backgroundImage: `url("${url}")` }}/>)}
          </ul>
          <div className="background-gradient"/>
          <img className="jumbotron-logo" src="/static/img/logo.png"/>
          <p className="jumbotron-down"><i className="fa fa-angle-down"></i></p>
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
    jumbotronImages: state.home.jumbotronImages,
  })
)(Home);
