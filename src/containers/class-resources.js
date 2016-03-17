import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';

import { loading, all, getClassResources, getClassArticles, clearClassResources, clearClassArticles } from '../actions';
import * as classutil from '../util/class';
import Icon from '../components/icon';
import DateString from '../components/date-string';

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
      <div className="howto">
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
                  <Link className="title" to={`/gallery/${classId}/articles/${article.id}`}>
                    <i className="fa fa-file-text-o"/>&nbsp;
                    {article.title}
                  </Link>
                </td>
                <td>
                  {article.created_by &&
                    <Link to={`/users/${article.created_by}`}>
                      <Icon user={article.created_by}/>
                    </Link>}
                  <DateString className="date" date={article.created_at}/>
                </td>
                <td>
                  {article.updated_by &&
                    <Link to={`/users/${article.updated_by}`}>
                      <Icon user={article.updated_by}/>
                    </Link>}
                  <DateString className="date" date={article.updated_at}/>
                </td>
              </tr>)
            }
            {resources.map((resource) =>
              <tr key={resource.id}>
                <td className="title-box">
                  <Link className="title" to={`/gallery/${classId}/resources/${resource.id}`}>
                    <i className="fa fa-paperclip"/>&nbsp;
                    {resource.title}
                  </Link>
                </td>
                <td>
                  {resource.created_by &&
                    <Link to={`/users/${resource.created_by}`}>
                      <Icon user={resource.created_by}/>
                    </Link>}
                  <DateString className="date" date={resource.created_at}/>
                </td>
                <td>
                  {resource.updated_by &&
                    <Link to={`/users/${resource.updated_by}`}>
                      <Icon user={resource.updated_by}/>
                    </Link>}
                  <DateString className="date" date={resource.updated_at}/>
                </td>
              </tr>)
            }
          </tbody>
        </table>
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
