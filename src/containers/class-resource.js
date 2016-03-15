import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { loading, getClassResource, clearClassResource } from '../actions';

class ClassResource extends React.Component {

  static fetchData = ({ params, dispatch }) => {
    return dispatch(loading(getClassResource(params.id)));
  };

  componentWillMount() {
    const { params, dispatch, resource } = this.props;
    if (_.isEmpty(resource) || params.id !== resource.id) {
      dispatch(clearClassResource);
      ClassResource.fetchData({ params, dispatch });
    }
  }

  render() {
    const { resource, clazz } = this.props;
    if (_.isEmpty(resource) || _.isEmpty(clazz)) {
      // not fetched yet
      return <p>loading...</p>;
    } else if (resource.class.id === clazz.id) {
      // normal case
      return (
        <div>
          <h1>{resource.title}</h1>
          <p>{resource.description}</p>
          <a href={resource.url}>ダウンロード</a>
        </div>
      );
    } else {
      // invalid resource
      return <p>資料が見つかりません</p>;
    }
  }
}

export default connect(
  state => ({
    clazz: state.clazz.clazz,
    resource: state.clazz.resource,
  })
)(ClassResource);
