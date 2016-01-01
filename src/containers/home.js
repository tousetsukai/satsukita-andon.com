import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getTopNews } from '../actions';

class Home extends Component {

  static fetchData({ dispatch }) {
    return dispatch(getTopNews);
  }

  componentWillMount() {
    if (_.isEmpty(this.props.topNews)) {
      Home.fetchData({ dispatch: this.props.dispatch });
    }
  }

  render() {
    const { topNews } = this.props;
    return (
      <div>
        <Helmet
          title="行灯職人への道"
          titleTemplate="%s"
        />
        <h3>News</h3>
        <p dangerouslySetInnerHTML={{__html: topNews.body}}></p>
      </div>
    );
  }
}

export default connect(
  state => ({
    topNews: state.home.topNews,
  })
)(Home);
