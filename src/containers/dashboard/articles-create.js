import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Form, FormField, FormInput } from 'elemental';

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
    this.context.router.push('/dashboard/articles');
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
          <FormField label="コメント" htmlFor="comment">
            <FormInput type="text"
                       name="comment"
                       onChange={this.handleCommentChange}/>
          </FormField>
          <button className="submit-button" type="button" onClick={this.handleSubmit}>送信</button>
        </Form>
      </div>
    );
  }
}

export default connect()(Articles);
