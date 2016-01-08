import React, { Component, PropTypes as T } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';

import { loading, all, getClassResources, getClassArticles, clearClassResources, clearClassArticles } from '../actions';
import * as classutil from '../util/class';
import Icon from '../components/icon';
import BreakableParagraph from '../components/breakable-paragraph';

class ClassResources extends Component {

  static fetchData = ({ params, dispatch }) => {
    const classId = `${params.times}${params.clazz}`;
    return dispatch(loading(all([
      getClassArticles(classId),
      getClassResources(classId),
    ])));
  }

  fetchData = (props) => {
    const { dispatch, articlesOf, resourcesOf, clazz } = props;
    if (_.isEmpty(clazz)) {
      return dispatch(all([clearClassResources, clearClassArticles]));
    } else {
      const classId = classutil.classId(clazz);
      if (resourcesOf !== classId) {
        dispatch(clearClassResources);
        return dispatch(loading(all([
          getClassResources(classId),
          getClassArticles(classId),
        ])));
      }
    }
  }

  componentWillMount = () => {
    this.fetchData(this.props);
  }

  componentWillUpdate = (nextProps) => {
    // empty => non empty, non empty => empty, non empty => another class
    if (_.isEmpty(this.props.clazz)) {
      !_.isEmpty(nextProps.clazz) && this.fetchData(nextProps);
    } else {
      const cond = _.isEmpty(nextProps.clazz) ||
                   classutil.classId(this.props.clazz) !== classutil.classId(nextProps.clazz);
      cond && this.fetchData(nextProps);
    }
  }

  render() {
    const { resources, articles } = this.props;
    return (
      <div>
        <ul>
          {articles.map(a => <li key={a.id}>{a.title}</li>)}
        </ul>
        <ul>
          {resources.map(r => <li key={r.id}>{r.title}</li>)}
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
