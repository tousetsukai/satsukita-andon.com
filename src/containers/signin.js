import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Form, FormField, FormInput } from 'elemental';

import useSheet from '../jss';
import color from '../jss/color';
import { ghostButton } from '../jss/util';
import { signin } from '../actions';

const sheet = {
  submit: {
    ...ghostButton(color.link, color.text),
  },
};

class Signin extends Component {

  state = {
    login: '',
    password: '',
  }

  onLoginChange = (ev) => {
    this.setState({
      ...this.state,
      login: ev.target.value,
    });
  }

  onPasswordChange = (ev) => {
    this.setState({
      ...this.state,
      password: ev.target.value,
    });
  }

  submitIfEnter = (ev) => {
    if (ev.key === 'Enter') {
      this.onSubmit();
    }
  }

  onSubmit = () => {
    this.props.dispatch(signin(this.state.login, this.state.password));
  }

  render() {
    return (
      <div>
        <Helmet
          title="ログイン"
        />
        <Form>
          <FormField label="ユーザー名" htmlFor="basic-form-input-login">
            <FormInput autofocus type="text"
                       name="basic-form-input-login"
                       onChange={this.onLoginChange}
                       onKeyPress={this.submitIfEnter}/>
          </FormField>
          <FormField label="パスワード" htmlFor="basic-form-input-password">
            <FormInput type="password"
                       name="basic-form-input-password"
                       onChange={this.onPasswordChange}
                       onKeyPress={this.submitIfEnter}/>
          </FormField>
          <button className={this.props.sheet.classes.submit} type="button" onClick={this.onSubmit}>ログイン</button>
        </Form>
      </div>
    );
  }
}

export default useSheet(connect()(Signin), sheet);
