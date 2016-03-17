import React from 'react';
import axios from 'axios';

export default class Downloader extends React.Component {

  static defaultProps = {
    crossorigin: false,
  };

  state = {
    blob: undefined,
  };

  componentWillMount() {
    const { crossorigin, url } = this.props;
    // http://stackoverflow.com/a/33830576/4366849
    if (crossorigin) {
      axios.get(url, {
        responseType: 'blob',
      }).then(res => {
        this.setState({
          blob: res.data,
        });
      });
    }
  }

  render() {
    const { url, filename, crossorigin } = this.props;
    if (crossorigin) {
      const { blob } = this.state;
      if (blob) {
        return (
          <a href={URL.createObjectURL(blob)} download={filename}>ダウンロード</a>
        );
      } else {
        return <p>準備しています...</p>;
      }
    } else {
      return (
        <a href={url} download={filename}>ダウンロード</a>
      );
    }
  }
}
