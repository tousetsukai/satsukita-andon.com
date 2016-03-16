import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';

import DateString from '../components/date-string';
import Icon from '../components/icon';
import { loading, getArticles } from '../actions';

class Howto extends Component {

  static fetchData({ dispatch }) {
    return dispatch(loading(getArticles({ offset: 0, limit: 15, orderby: 'updated_at DESC'})));
  }

  state = {
    fetchingArticles: false,
  };

  componentWillMount() {
    if (_.isEmpty(this.props.articles)) {
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
        limit: 30,
        orderby: 'updated_at DESC',
      }))).then(() => {
        this.setState({
          fetchingArticles: false,
        });
      });
    }
  };

  render() {
    const { articles, articleCount, allArticleCount } = this.props;
    let loadArticle = '';
    if (articleCount === allArticleCount) {
      loadArticle = '';
    } else if (this.state.fetchingArticles) {
      loadArticle = <p className="more-load">loading...</p>;
    } else {
      loadArticle = <p className="more-load" onClick={this.fetchMoreArticles}>さらに読み込む</p>;
    }
    return (
      <div className="howto container padding-container">
        <Helmet
          title="Howto"
        />
        <h2>記事</h2>
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
                <td>
                  <Link className="title" to={`/howto/articles/${article.id}`}>
                    {article.title}
                  </Link>
                  {article.tags && article.tags.map((t, i) => <div key={i} className="class-tag">{t}</div>)}
                </td>
                <td>
                  <Link to={`/users/${article.owner.login}`}>
                    <Icon user={article.owner}/>
                  </Link>
                  <DateString className="date" date={article.created_at}/>
                </td>
                <td>
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
    );
  }
}

export default connect(
  state => ({
    articles: state.howto.articles,
    articleCount: state.howto.articleCount,
    allArticleCount: state.howto.allArticleCount,
  })
)(Howto);
