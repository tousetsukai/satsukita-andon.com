import React, { Component } from 'react';
import api from '../api';

export default class ImageUpload extends Component {

  state = {
    thumbnailUrl: undefined,
    fullsizeUrl: undefined,
    rawUrl: undefined,
    error: false,
  };

  componentWillMount() {
    api.postImage(this.props.image)
      .then(res => {
        this.setState({
          thumbnailUrl: res.data.thumbnail_url,
          fullsizeUrl: res.data.fullsize_url,
          rawUrl: res.data.raw_url,
          error: false,
        });
      })
      .catch(() => {
        this.setState({
          ...this.state,
          error: true,
        });
      });
  }

  render() {
    const { thumbnailUrl, fullsizeUrl, rawUrl, error } = this.state;
    return (
      <div>
        {thumbnailUrl ? <img src={thumbnailUrl}/> : <p>アップロード中...</p>}
        {fullsizeUrl}
        {rawUrl}
        {error ? 'error' : 'not error'}
      </div>
    );
  }
}
