import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { loading, getClassArticle, clearClassArticle } from '../actions';
import Markdown from '../components/markdown';

class ClassArticle extends React.Component {

  static fetchData = ({ params, dispatch }) => {
    return dispatch(loading(getClassArticle(params.id)));
  };

  componentWillMount() {
    const { params, dispatch, article } = this.props;
    if (_.isEmpty(article) || params.id !== article.id) {
      dispatch(clearClassArticle);
      ClassArticle.fetchData({ params, dispatch });
    }
  }

  render() {
    const { article, clazz } = this.props;
    if (_.isEmpty(article) || _.isEmpty(clazz)) {
      // not fetched yet
      return <p>loading...</p>;
    } else if (article.class.id === clazz.id) {
      // normal case
      return (
        <div>
          <h1>{article.title}</h1>
          <Markdown md={article.body}/>
        </div>
      );
    } else {
      // invalid article
      return <p>記事が見つかりません</p>;
    }
  }
}

export default connect(
  state => ({
    clazz: state.clazz.clazz,
    article: state.clazz.article,
  })
)(ClassArticle);
