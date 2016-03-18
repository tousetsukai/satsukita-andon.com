import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Form, FormField, FormInput } from 'elemental';
import Dropzone from 'react-dropzone';

import Markdown from '../../components/markdown';
import ImageUpload from '../../components/image-upload';
import { postArticle } from '../../actions';

class Articles extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  state = {
    title: '',
    body: '',
    status: 'published', // or 'private'
    editorial_right: 'selected', // or 'all' or 'classmate' or 'cohort'
    editors: [],
    comment: '新規作成',
    images: [],
  };

  handleTitleChange = (ev) => {
    this.setState({
      ...this.state,
      title: ev.target.value,
    });
  };

  handleBodyChange = (ev) => {
    this.setState({
      ...this.state,
      body: ev.target.value,
    });
  };

  handleCommentChange = (ev) => {
    this.setState({
      ...this.state,
      comment: ev.target.value,
    });
  };

  handleSubmit = () => {
    const { title, body, comment } = this.state;
    this.props.dispatch(postArticle({
      title,
      body,
      comment,
      status: 'published',
      editorial_right: 'selected',
      editors: [],
    })).then(ok => {
      if (ok) {
        this.context.router.push('/dashboard/articles');
      }
    });
  };

  handleDrop = (files) => {
    const images = this.state.images.concat(files.map(f => <ImageUpload image={f}/>));
    this.setState({
      ...this.state,
      images,
    });
  };

  render() {
    return (
      <div>
        <Helmet
          title="記事の新規作成"
        />
        <h1>記事 新規作成</h1>
        <Form>
          <FormField label="タイトル" htmlFor="title">
            <FormInput autofocus type="text"
                       name="title"
                       onChange={this.handleTitleChange}/>
          </FormField>
          <FormField label="本文" htmlFor="body">
            <FormInput multiline type="text"
                       name="body"
                       onChange={this.handleBodyChange}/>
          </FormField>
          <Markdown md={this.state.body}/>
          <Dropzone onDrop={this.handleDrop}>
            画像をアップロード (クリックまたはドラッグアンドドロップ)
          </Dropzone>
          <ul>
            {this.state.images.map((image, i) => <li key={i}>{image}</li>)}
          </ul>
          <FormField label="コメント" htmlFor="comment">
            <FormInput type="text"
                       name="comment"
                       value={this.state.comment}
                       onChange={this.handleCommentChange}/>
          </FormField>
          <button className="submit-button" type="button" onClick={this.handleSubmit}>送信</button>
        </Form>
      </div>
    );
  }
}

export default connect()(Articles);
