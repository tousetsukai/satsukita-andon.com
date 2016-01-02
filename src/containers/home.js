import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getTopNews } from '../actions';
import useSheet from '../jss';

const sheet = {
  // ref: http://stackoverflow.com/questions/7273338/how-to-vertically-align-an-image-inside-div
  logoWrapper: {
    width: '100%',
    height: 400,
    'text-align': 'center',
  },
  logoHelper: {
    display: 'inline-block',
    height: '100%',
    'vertical-align': 'middle',
  },
  logo: {
    'vertical-align': 'middle',
  },
};

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
    const { sheet, topNews } = this.props;
    const { classes } = sheet;
    return (
      <div>
        <Helmet
          title="行灯職人への道"
          titleTemplate="%s"
        />
        <div className={classes.logoWrapper}>
          <span className={classes.logoHelper}/>
          <img className={classes.logo} src="/static/img/logo.png"/>
        </div>
        <h3>News</h3>
        <p dangerouslySetInnerHTML={{__html: topNews.body}}></p>
      </div>
    );
  }
}

export default useSheet(connect(
  state => ({
    topNews: state.home.topNews,
  })
)(Home), sheet);
