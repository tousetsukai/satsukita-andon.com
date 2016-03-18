import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { loading, getClassArticle, clearClassArticle } from '../actions';
import Markdown from '../components/markdown';
import ResourceHeader from '../components/resource-header';

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
      return <p className="container padding-container">loading...</p>;
    } else if (article.class.id === clazz.id) {
      // normal case
      return (
        <div>
          <ResourceHeader
              title={article.title}
              tags={[]}
              createdBy={article.created_by}
              updatedBy={article.updated_by}
              createdAt={article.created_at}
              updatedAt={article.updated_at}/>
          <div className="container padding-container">
            <Markdown md={article.body}/>
          </div>
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
