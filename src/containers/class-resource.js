import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { loading, getClassResource, clearClassResource } from '../actions';
import ResourceHeader from '../components/resource-header';
import Downloader from '../components/downloader';

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
      const ext = resource.url.split('.').pop();
      return (
        <div>
          <ResourceHeader
              title={resource.title}
              tags={[]}
              createdBy={resource.created_by}
              updatedBy={resource.updated_by}
              createdAt={resource.created_at}
              updatedAt={resource.updated_at}/>
          <div className="container padding-container">
            <p>{resource.description}</p>
            <p>ファイル形式: {ext}</p>
            <Downloader url={resource.url} filename={`${resource.title}.${ext}`}/>
          </div>
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
