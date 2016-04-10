import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import ResourceListColumn from '../components/resource-list-column';
import { loading, getArticles, getResources, all, clearArticles, clearResources } from '../actions';

class Howto extends Component {

  static fetchData({ dispatch }) {
    return dispatch(loading(all([
      getArticles({ offset: 0, limit: 10, orderby: 'updated_at DESC'}),
      getResources({ offset: 0, limit: 10, orderby: 'updated_at DESC'}),
    ])));
  }

  state = {
    fetchingArticles: false,
    fetchingResources: false,
  };

  componentWillMount() {
    const { dispatch, rendered } = this.props;
    if (rendered) {
      dispatch(all([clearArticles, clearResources ]));
      Howto.fetchData({ dispatch });
    }
  }

  fetchMoreArticles = () => {
    const { dispatch, articleCount, allArticleCount } = this.props;
    if (!this.props.loading && articleCount < allArticleCount) {
      this.setState({
        fetchingArticles: true,
      });
      return dispatch(loading(getArticles({
        offset: articleCount,
        limit: 20,
        orderby: 'updated_at DESC',
      }))).then(() => {
        this.setState({
          fetchingArticles: false,
        });
      });
    }
  };

  fetchMoreResources = () => {
    const { dispatch, resourceCount, allResourceCount } = this.props;
    if (!this.props.loading && resourceCount < allResourceCount) {
      this.setState({
        fetchingResources: true,
      });
      return dispatch(loading(getResources({
        offset: resourceCount,
        limit: 20,
        orderby: 'updated_at DESC',
      }))).then(() => {
        this.setState({
          fetchingResources: false,
        });
      });
    }
  };

  render() {
    const { articles, articleCount, allArticleCount,
            resources, resourceCount, allResourceCount } = this.props;

    let loadArticle = '';
    if (articleCount === allArticleCount) {
      loadArticle = '';
    } else if (this.state.fetchingArticles) {
      loadArticle = <p className="more-load">loading...</p>;
    } else {
      loadArticle = <p className="more-load" onClick={this.fetchMoreArticles}>さらに読み込む</p>;
    }

    let loadResource = '';
    if (resourceCount === allResourceCount) {
      loadResource = '';
    } else if (this.state.fetchingResources) {
      loadResource = <p className="more-load">loading...</p>;
    } else {
      loadResource = <p className="more-load" onClick={this.fetchMoreResources}>さらに読み込む</p>;
    }

    return (
      <div className="howto container padding-container">
        <Helmet
          title="Howto"
        />

        <div className="two-columns">
          <div className="column column-articles">
            <h2 className="column-title">記事</h2>
            <ResourceListColumn
                icon="fa-file-text"
                items={articles}
                url={item => `/howto/articles/${item.id}`}
                tags={item => item.tags}
                createdBy={item => item.owner}
                updatedBy={item => item.editor}/>
            {loadArticle}
          </div>

          <div className="column column-resources">
            <h2 className="column-title">資料</h2>
            <ResourceListColumn
                icon="fa-paperclip"
                items={resources}
                url={item => `/howto/resources/${item.id}`}
                tags={item => item.tags}
                createdBy={item => item.owner}
                updatedBy={item => item.editor}/>
            {loadResource}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    articles: state.howto.articles,
    articleCount: state.howto.articleCount,
    allArticleCount: state.howto.allArticleCount,
    resources: state.howto.resources,
    resourceCount: state.howto.resourceCount,
    allResourceCount: state.howto.allResourceCount,
    rendered: state.app.rendered,
  })
)(Howto);
