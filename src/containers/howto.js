import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';

import DateString from '../components/date-string';
import Icon from '../components/icon';
import { loading, getArticles, getResources, all } from '../actions';

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
    if (_.isEmpty(this.props.articles) || _.isEmpty(this.props.resources)) {
      Howto.fetchData({ dispatch: this.props.dispatch });
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
            <table className="howto-table">
              <thead>
                <tr>
                  <th>タイトル</th>
                  <th>作成</th>
                  <th>更新</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) =>
                  <tr key={article.id}>
                    <td className="title-box">
                      <Link className="title" to={`/howto/articles/${article.id}`}>
                        <i className="fa fa-file-text"/>&nbsp;
                        {article.title}
                      </Link>
                      <ul className="tags">
                        {article.tags.map((t, i) => <li key={i}><Link to={`/howto/tags/${t}`} className="tag resource-tag">{t}</Link></li>)}
                      </ul>
                    </td>
                    <td className="author-box">
                      <Link to={`/users/${article.owner.login}`}>
                        <Icon user={article.owner}/>
                      </Link>
                      <DateString className="date" date={article.created_at}/>
                    </td>
                    <td className="author-box">
                      <Link to={`/users/${article.editor.login}`}>
                        <Icon user={article.editor}/>
                      </Link>
                      <DateString className="date" date={article.updated_at}/>
                    </td>
                  </tr>)
                }
              </tbody>
            </table>
            {loadArticle}
          </div>

          <div className="column column-resources">
            <h2 className="column-title">資料</h2>
            <table className="howto-table">
              <thead>
                <tr>
                  <th>タイトル</th>
                  <th>作成</th>
                  <th>更新</th>
                </tr>
              </thead>
              <tbody>
                {resources.map((resource) =>
                  <tr key={resource.id}>
                    <td className="title-box">
                      <Link className="title" to={`/howto/resources/${resource.id}`}>
                        <i className="fa fa-paperclip"/>&nbsp;
                        {resource.title}
                      </Link>
                      <ul className="tags">
                        {resource.tags.map((t, i) => <li key={i}><Link to={`/howto/tags/${t}`} className="tag resource-tag">{t}</Link></li>)}
                      </ul>
                    </td>
                    <td className="author-box">
                      <Link to={`/users/${resource.owner.login}`}>
                        <Icon user={resource.owner}/>
                      </Link>
                      <DateString className="date" date={resource.created_at}/>
                    </td>
                    <td className="author-box">
                      <Link to={`/users/${resource.editor.login}`}>
                        <Icon user={resource.editor}/>
                      </Link>
                      <DateString className="date" date={resource.updated_at}/>
                    </td>
                  </tr>)
                }
              </tbody>
            </table>
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
  })
)(Howto);
