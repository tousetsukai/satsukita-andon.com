import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';

import { loading, all, getClassResources, getClassArticles, clearClassResources, clearClassArticles } from '../actions';
import * as classutil from '../util/class';

class ClassResources extends Component {

  static fetchData = ({ params, dispatch }) => {
    const classId = `${params.times}${params.clazz}`;
    return dispatch(loading(all([
      getClassArticles(classId),
      getClassResources(classId),
    ])));
  };

  fetchData = (props) => {
    const { dispatch, articlesOf, resourcesOf, clazz } = props;
    if (_.isEmpty(clazz)) {
      return dispatch(all([clearClassResources, clearClassArticles]));
    } else {
      const classId = classutil.classId(clazz);
      if (resourcesOf !== classId || articlesOf !== classId) {
        dispatch(all([clearClassArticles, clearClassResources]));
        return dispatch(loading(all([
          getClassResources(classId),
          getClassArticles(classId),
        ])));
      }
    }
  };

  componentWillMount = () => {
    this.fetchData(this.props);
  };

  componentWillUpdate = (nextProps) => {
    // empty => non empty, non empty => empty, non empty => another class
    if (_.isEmpty(this.props.clazz)) {
      !_.isEmpty(nextProps.clazz) && this.fetchData(nextProps);
    } else {
      const cond = _.isEmpty(nextProps.clazz) ||
                   classutil.classId(this.props.clazz) !== classutil.classId(nextProps.clazz);
      cond && this.fetchData(nextProps);
    }
  };

  render() {
    const { clazz, resources, articles } = this.props;
    const classId = classutil.classIdWithSlash(clazz);
    return (
      <div>
        <h2>記事</h2>
        <ul>
          {articles.map(a => <li key={a.id}><Link to={`/gallery/${classId}/articles/${a.id}`}>{a.title}</Link></li>)}
        </ul>
        <h2>資料</h2>
        <ul>
          {resources.map(r => <li key={r.id}><Link to={`/gallery/${classId}/resources/${r.id}`}>{r.title}</Link></li>)}
        </ul>
      </div>
    );
  }
}

export default connect(
  state => ({
    clazz: state.clazz.clazz,
    articles: state.clazz.articles,
    articlesOf: state.clazz.articlesOf,
    resources: state.clazz.resources,
    resourcesOf: state.clazz.resourcesOf,
  })
)(ClassResources);
