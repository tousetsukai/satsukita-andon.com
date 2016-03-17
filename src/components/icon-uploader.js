import React, { Component } from 'react';
import AvatarEditor from 'react-avatar-editor';

import api from '../api';

export default class IconUploader extends Component {

  state = {
    image: undefined,
    scale: 1,
    uploading: false,
    error: false,
    success: false,
  };

  upload = (e) => {
    e.preventDefault();

    const base64 = this.refs.avatar.getImage('image/png');
    const bin = atob(base64.replace(/^.*,/, ''));
    const buffer = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) {
      buffer[i] = bin.charCodeAt(i);
    }
    const image = new Blob([buffer.buffer], {
      type: 'image/png',
    });

    this.setState({
      uploading: true,
      success: false,
      error: false,
    });
    api.postIcon(image).then(res => {
      this.setState({
        uploading: false,
        success: true,
      });
      this.props.onIconChange(res.data.url);
    }).catch(() => {
      this.setState({
        uploading: false,
        error: true,
      });
    });
  };

  handleScale = (ev) => {
    const scale = parseFloat(ev.target.value);
    this.setState({ scale });
  };

  setImage = (e) => {
    // this code is from https://github.com/roadmanfong/react-cropper/blob/master/example/index.js
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ image: reader.result });
    };
    reader.readAsDataURL(files[0]);
  };

  render() {
    const { image, scale, uploading, success, error } = this.state;
    return (
      <div className="icon-uploader">
        <input className="file-selector" type="file" onChange={this.setImage} accept="image/*"/>
        {image && <div>
          <AvatarEditor
              ref="avatar"
              image={image}
              width={200}
              height={200}
              scale={scale}
              color={[255, 255, 255, 0.5]}/>
          <input type="range" className="scale-slider"
                 onChange={this.handleScale}
                 min="1" max="3" step="0.01" defaultValue="1"/>
          {uploading ? <p>アップロード中...</p> : <a className="upload-button" onClick={this.upload}>送信</a>}
          {success && <p>アイコンを変更しました</p>}
          {error && <p>アイコンの変更に失敗しました</p>}
        </div>}
      </div>
    );
  }
}
