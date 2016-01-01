import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Form, FormField, FormInput } from 'elemental';
import Cookies from 'js-cookie';

import useSheet from '../jss';
import color from '../jss/color';
import { ghostButton } from '../jss/util';
import api from '../api';
import { showError } from '../actions/app';

const sheet = {
  submit: {
    ...ghostButton(color.link, color.text),
  },
};

const getToken = (login, password) => (dispatch) => api.getToken(login, password)
  .then(res => {
    const token = res.data.token;
    Cookies.set('token', token);
    return token;
  }).then(token => {
    return api.getUser(token);
  }).then(res => {
    return dispatch({ type: 'app:user:set', user: res.data });
  }).catch(res => {
    if (res.status === 400) {
      return showError(res.data.code, 'ユーザー名またはパスワードが間違っています。')(dispatch);
    }
  });

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
    console.log(ev.key);
    if (ev.key === 'Enter') {
      this.onSubmit();
    }
  }

  onSubmit = () => {
    this.props.dispatch(getToken(this.state.login, this.state.password));
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
