import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';
import Remarkable from 'remarkable';

import { loading, getArticle, clearArticle } from '../actions';
import useSheet from '../jss';
import { meta } from '../util/helmet';

const sheet = {
};

class Article extends Component {

  static fetchData({ params, dispatch }) {
    return dispatch(loading(getArticle(params.id)));
  }

  componentWillMount() {
    const { params, dispatch, article } = this.props;
    if (_.isEmpty(article) || (params.id !== article.id)) {
      dispatch(clearArticle);
      Article.fetchData({ params, dispatch });
    }
  }

  render() {
    const { article } = this.props;
    const md = new Remarkable({
      html: true,
      linkify: true,
    });
    return (
      <div>
        <Helmet title={`${article.title} - Howto`}
                meta={meta(article.title, `${article.body.substring(0, 180)}...`)}
        />
        <article dangerouslySetInnerHTML={{__html: md.render(article.body)}}/>
      </div>
    );
  }
}

export default useSheet(connect(
  state => ({
    article: state.howto.article,
  })
)(Article), sheet);
