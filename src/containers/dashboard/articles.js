import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

class Articles extends Component {
  render() {
    return (
      <div>
        <h1>記事</h1>
        <Link to="/dashboard/articles/create">新規作成</Link>
        <h2>一覧</h2>
        <ul>
          <li>ここに記事一覧</li>
        </ul>
      </div>
    );
  }
}

export default connect(
  state => ({
    articles: state.dashboard.articles,
  })
)(Articles);
