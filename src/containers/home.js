import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import _ from 'lodash';
import Remarkable from 'remarkable';

import { loading, getFixedContent } from '../actions';
import useSheet from '../jss';
import size from '../jss/size';

const sheet = {
  // ref: http://stackoverflow.com/questions/7273338/how-to-vertically-align-an-image-inside-div
  logoWrapper: {
    width: '100%',
    height: size.homeLogoHeight,
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
    return dispatch(loading(getFixedContent('news')));
  }

  componentWillMount() {
    if (_.isEmpty(this.props.topNews)) {
      Home.fetchData({ dispatch: this.props.dispatch });
    }
  }

  render() {
    const { sheet, topNews } = this.props;
    const { classes } = sheet;
    const md = new Remarkable({
      html: true,
      linkify: true,
    });
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
        <article dangerouslySetInnerHTML={{__html: md.render(topNews.body)}}></article>
      </div>
    );
  }
}

export default useSheet(connect(
  state => ({
    topNews: state.contents.news,
  })
)(Home), sheet);
