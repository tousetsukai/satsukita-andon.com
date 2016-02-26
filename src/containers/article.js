import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';

import { loading, getArticle, clearArticle } from '../actions';
import Markdown from '../components/markdown';
import { meta } from '../util/helmet';
import f from '../util/f';

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

  componentWillUpdate(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      nextProps.dispatch(clearArticle);
      Article.fetchData({ ...nextProps });
    }
  }

  render() {
    const { article } = this.props;
    return (
      <div className="container padding-container">
        <Helmet title={`${article.title} - Howto`}
                meta={meta(article.title, `${f.map(article.body, (b) => b.substring(0, 180))}...`)}
        />
        {article.body && <Markdown md={article.body} debug={true}/>}
      </div>
    );
  }
}

export default connect(
  state => ({
    article: state.howto.article,
  })
)(Article);
