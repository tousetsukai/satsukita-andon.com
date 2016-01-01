import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Button, Form, FormField, FormInput } from 'elemental';

import useSheet from '../jss';
import * as color from '../jss/color';

const sheet = {
  '.FormLabel': {
    color: color.text,
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

  onSubmit = () => {
    console.log(this.state.login, this.state.password);
  }

  render() {
    return (
      <div>
        <Helmet
          title="ログイン"
        />
        <Form>
          <FormField label="ユーザー名" htmlFor="basic-form-input-login">
            <FormInput autofocus type="text" name="basic-form-input-login" onChange={this.onLoginChange}/>
          </FormField>
          <FormField label="パスワード" htmlFor="basic-form-input-password">
            <FormInput type="password" name="basic-form-input-password" onChange={this.onPasswordChange}/>
          </FormField>
          <Button type="hollow-primary" onClick={this.onSubmit}>ログイン</Button>
        </Form>
      </div>
    );
  }
}

export default useSheet(Signin, sheet);
