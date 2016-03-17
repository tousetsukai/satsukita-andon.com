import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';

import { loading, getResource, clearResource } from '../actions';
import { meta } from '../util/helmet';
import f from '../util/f';
import Downloader from '../components/downloader';
import ResourceHeader from '../components/resource-header';

class Resource extends Component {

  static fetchData({ params, dispatch }) {
    return dispatch(loading(getResource(params.id)));
  }

  componentWillMount() {
    const { params, dispatch, resource } = this.props;
    if (_.isEmpty(resource) || (params.id !== resource.id)) {
      dispatch(clearResource);
      Resource.fetchData({ params, dispatch });
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      nextProps.dispatch(clearResource);
      Resource.fetchData({ ...nextProps });
    }
  }

  render() {
    const { resource } = this.props;
    if (_.isEmpty(resource)) {
      return <p>loading...</p>;
    } else {
      const ext = resource.url.split('.').pop();
      return (
        <div>
          <Helmet title={`${resource.title} - Howto`}
                  meta={meta(resource.title, `${f.map(resource.body, (b) => b.substring(0, 180))}...`)}
          />
          <ResourceHeader
              title={resource.title}
              tags={resource.tags}
              createdBy={resource.owner}
              updatedBy={resource.editor}
              createdAt={resource.created_at}
              updatedAt={resource.updated_at}/>
          <div className="container padding-container">
            <p>{resource.description}</p>
            <p>ファイル形式: {ext}</p>
            <Downloader url={resource.url} filename={`${resource.title}.${ext}`}/>
          </div>
        </div>
      );
    }
  }
}

export default connect(
  state => ({
    resource: state.howto.resource,
  })
)(Resource);
