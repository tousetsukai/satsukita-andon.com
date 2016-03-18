import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';

import { loading, getEditableArticles } from '../../actions';

class Articles extends Component {

  static fetchData = ({ dispatch }) => {
    return dispatch(loading(getEditableArticles({
      offset: 0, limit: 20, orderby: 'created_at DESC',
    })));
  };

  componentWillMount() {
    if (_.isEmpty(this.props.articles)) {
      Articles.fetchData(this.props);
    }
  }

  isEditable = (article) => {
    switch (article.editorial_right) {
    case 'selected':
      /* return article.editors.indexOf(me.id); */
      return false; // TODO
    case 'classmate':
      return false; // TODO
    case 'cohort':
      return false; // TODO
    case 'all':
      return true;
    default:
      return false;
    }
  };

  isDeletable = (article) => {
    return this.props.user.id === article.owner.id;
  };

  render() {
    const { articles } = this.props;
    return (
      <div>
        <h1>記事</h1>
        <Link to="/dashboard/articles/create">新規作成</Link>
        <h2>一覧</h2>
        <ul>
          {articles.map(a => (
             <li key={a.id}>
               <p>{a.title}</p>
               {this.isEditable(a) && <Link to={`/dashboard/articles/${a.id}/edit`}>編集</Link>}
             </li>)
           )}
        </ul>
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.app.user,
    articles: state.dashboard.articles,
  })
)(Articles);
