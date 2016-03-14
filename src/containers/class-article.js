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
    const { article } = this.props;
    return (
      <div>
        <h1>{article.title}</h1>
        {article.body && <Markdown md={article.body}/>}
      </div>
    );
  }
}

export default connect(
  state => ({
    clazz: state.clazz.clazz,
    article: state.clazz.article,
  })
)(ClassArticle);
