import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { loading, all, getClassResources, getClassArticles, clearClassResources, clearClassArticles } from '../actions';
import * as classutil from '../util/class';
import ResourceListColumn from '../components/resource-list-column';

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
      <div className="container padding-container howto">
        <div className="two-columns">
          <div className="column column-articles">
            <h2 className="column-title">記事</h2>
            <ResourceListColumn
                icon="fa-file-text"
                items={articles}
                url={item => `/gallery/${classId}/articles/${item.id}`}
                tags={() => []}
                createdBy={item => item.created_by}
                updatedBy={item => item.updated_by}/>
          </div>

          <div className="column column-resources">
            <h2 className="column-title">資料</h2>
            <ResourceListColumn
                icon="fa-paperclip"
                items={resources}
                url={item => `/gallery/${classId}/resources/${item.id}`}
                tags={() => []}
                createdBy={item => item.created_by}
                updatedBy={item => item.updated_by}/>
          </div>
        </div>
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
