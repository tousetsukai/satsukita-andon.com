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
    return dispatch(loading(getArticles({})));
  }

  componentWillMount() {
    if (_.isEmpty(this.props.articles)) {
      Howto.fetchData({ dispatch: this.props.dispatch });
    }
  }

  render() {
    const { articles } = this.props;
    return (
      <div className="container padding-container">
        <Helmet
          title="Howto"
        />
        <ul>
          {articles.map((article) =>
            <li key={article.id}>
              <Link to={`/howto/articles/${article.id}`}>
                {article.title}
              </Link>
              <Link to={`/users/${article.owner.login}`}>
                <Icon user={article.owner}/>
              </Link>
              <Link to={`/users/${article.editor.login}`}>
                <Icon user={article.editor}/>
              </Link>
              <DateString date={article.created_at}/>
              <DateString date={article.updated_at}/>
            </li>)
          }
        </ul>
      </div>
    );
  }
}

export default connect(
  state => ({
    articles: state.howto.articles,
  })
)(Howto);
