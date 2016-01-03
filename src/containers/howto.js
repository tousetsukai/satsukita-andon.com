import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';

import { loading, getArticles } from '../actions';
import useSheet from '../jss';

const sheet = {
};

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
      <div>
        <Helmet
          title="Howto"
        />
        <ul>
          {articles.map((article) =>
            <li key={article.id}>
              <Link to={`/howto/articles/${article.id}`}>
                {article.title}
              </Link>
            </li>)
          }
        </ul>
      </div>
    );
  }
}

export default useSheet(connect(
  state => ({
    articles: state.howto.articles,
  })
)(Howto), sheet);
