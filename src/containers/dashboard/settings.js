import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Form, FormField, FormInput } from 'elemental';
import Dropzone from 'react-dropzone';

import IconUploader from '../../components/icon-uploader';
import { setIcon } from '../../actions';

class Settings extends Component {

  handleIconChange = (url) => {
    this.props.dispatch(setIcon(url));
  };

  render() {
    return (
      <div>
        <h2>アカウント情報の変更</h2>
        <Form>
        </Form>
        <h2>アイコンの変更</h2>
        <IconUploader onIconChange={this.handleIconChange}/>
      </div>
    );
  }
}

export default connect()(Settings);
