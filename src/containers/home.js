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
    backgroundImages: [], // jumbotron background images
    inJumbotron: true,
  };

  componentWillMount() {
    if (this.props.rendered) {
      Home.fetchData(this.props);
    }
  }

  componentDidMount() {
    if (window) {
      window.addEventListener('scroll', this.handleScroll);
    }
    this.setState({
      backgroundImages: _.shuffle([1,2,3,4,5,6,7,8,9,10]).map(i =>
        `https://static.satsukita-andon.com/files/jumbotron/${i}.jpg`
      ).slice(0, 5),
    });
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  handleScroll = (ev) => {
    const inJumbotron = ev.target.scrollingElement.scrollTop < window.innerHeight;
    if (inJumbotron !== this.state.inJumbotron) {
      this.setState({ inJumbotron });
    }
  };

  render() {
    const { topNews } = this.props;
    const { backgroundImages } = this.state;
    return (
      <div className="home-container">
        <Helmet
          title="行灯職人への道"
          titleTemplate="%s"
        />
        {this.state.inJumbotron && (<style>
          {`.header { background: none !important; box-shadow: none !important; }`}
        </style>)}
        <div className="home-jumbotron">
          <ul className="background-images">
            {backgroundImages.map((url, i) =>
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
    rendered: state.app.rendered,
  })
)(Home);
