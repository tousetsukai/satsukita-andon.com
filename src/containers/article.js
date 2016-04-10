import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';

import { loading, getArticle, clearArticle } from '../actions';
import Markdown from '../components/markdown';
import ResourceHeader from '../components/resource-header';
import { meta } from '../util/helmet';
import f from '../util/f';

class Article extends Component {

  static fetchData({ params, dispatch }) {
    return dispatch(loading(getArticle(params.id)));
  }

  componentWillMount() {
    const { params, dispatch } = this.props;
    if (this.props.rendered) {
      dispatch(clearArticle);
      Article.fetchData({ params, dispatch });
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      nextProps.dispatch(clearArticle);
      Article.fetchData({ ...nextProps });
    }
  }

  render() {
    const { article } = this.props;
    if (_.isEmpty(article)) {
      return <p className="container padding-container">loading...</p>;
    } else {
      return (
        <div>
          <Helmet title={`${article.title} - Howto`}
                  meta={meta(article.title, `${f.map(article.body, (b) => b.substring(0, 180))}...`)}
          />
          <ResourceHeader
              title={article.title}
              tags={article.tags}
              createdBy={article.owner}
              updatedBy={article.editor}
              createdAt={article.created_at}
              updatedAt={article.updated_at}/>
          <div className="container padding-container">
            {article.body && <Markdown md={article.body} debug={true}/>}
          </div>
        </div>
      );
    }
  }
}

export default connect(
  state => ({
    article: state.howto.article,
    rendered: state.app.rendered,
  })
)(Article);
