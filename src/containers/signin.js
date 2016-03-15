import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Form, FormField, FormInput } from 'elemental';

import { loading, signin } from '../actions';

class Signin extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  state = {
    login: '',
    password: '',
  };

  onLoginChange = (ev) => {
    this.setState({
      ...this.state,
      login: ev.target.value,
    });
  };

  onPasswordChange = (ev) => {
    this.setState({
      ...this.state,
      password: ev.target.value,
    });
  };

  submitIfEnter = (ev) => {
    if (ev.key === 'Enter') {
      this.onSubmit();
    }
  };

  onSubmit = () => {
    const { router } = this.context;
    this.props.dispatch(loading(signin(this.state.login, this.state.password)))
      .then(ok => {
        if (ok) {
          router.push('/dashboard/home');
        }
      });
  };

  render() {
    return (
      <div className="container padding-container">
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
          <button className="submit-button" type="button" onClick={this.onSubmit}>ログイン</button>
        </Form>
      </div>
    );
  }
}

export default connect()(Signin);
