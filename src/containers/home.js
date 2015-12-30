import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import api from '../api';

const getTopNews = (dispatch) => api.getTopNews()
  .then(res => dispatch({ type: 'set_top_news', topNews: res.data }));

class Home extends Component {

  static fetchData({ dispatch }) {
    return dispatch(getTopNews);
  }

  render() {
    return (
      <div>
        <Helmet
          title="行灯職人への道"
          titleTemplate="%s"
        />
        <p>News</p>
      </div>
    );
  }
}

export default connect(
  state => ({
    topNews: state.home.topNews
  })
)(Home);
