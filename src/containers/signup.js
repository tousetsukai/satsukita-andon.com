import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Form, FormField, FormInput } from 'elemental';

import { loading, signup } from '../actions';
import info from '../util/satsukita-info';

class Signup extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  state = {
    login: '',
    password: '',
    passwordConfirm: '',
    times: info.firstGradeTimes,
  };

  handleLoginChange = (ev) => {
    this.setState({
      login: ev.target.value,
    });
  };
  handleNameChange = (ev) => {
    this.setState({
      name: ev.target.value,
    });
  };
  handlePasswordChange = (ev) => {
    this.setState({
      password: ev.target.value,
    });
  };
  handlePasswordConfirmChange = (ev) => {
    this.setState({
      passwordConfirm: ev.target.value,
    });
  };
  handleTimesChange = (ev) => {
    const t = info.firstGradeTimes;
    const n = parseInt(ev.target.value);
    if (isNaN(n)) {
      this.setState({
        times: t,
      });
    } else if (1 <= n && n <= t) {
      this.setState({
        times: n,
      });
    } else if (n < 1) {
      this.setState({
        times: 1,
      });
    } else {
      this.setState({
        times: t,
      });
    }
  };

  submitIfEnter = (ev) => {
    if (ev.key === 'Enter') {
      this.handleSubmit();
    }
  };

  handleSubmit = () => {
    const { router } = this.context;
    const { login, name, password, passwordConfirm, times } = this.state;
    if (password === passwordConfirm) {
      this.props.dispatch(loading(signup(login, password, name, times))).then(ok => {
        if (ok) {
          router.push('/dashboard/settings');
        }
      });
    }
  };

  render() {
    const { login, name, password, passwordConfirm, times } = this.state;
    return (
      <div className="container padding-container">
        <Helmet
          title="ユーザー登録"
        />
        <p>もうしばらくお待ち下さい</p>
        {/* <Form>
        <FormField label="ログインID (半角英数字, アンダースコア(_), ハイフン(-) のみ)" htmlFor="login">
        <FormInput autofocus type="text"
        name="login"
        onChange={this.handleLoginChange}
        value={login}
        onKeyPress={this.submitIfEnter}/>
        </FormField>
        <FormField label="名前" htmlFor="name">
        <FormInput type="text"
        name="name"
        onChange={this.handleNameChange}
        value={name}
        onKeyPress={this.submitIfEnter}/>
        </FormField>
        <FormField label="パスワード" htmlFor="password">
        <FormInput type="password"
        name="password"
        onChange={this.handlePasswordChange}
        value={password}
        onKeyPress={this.submitIfEnter}/>
        </FormField>
        <FormField label="パスワード (確認)" htmlFor="password-confirm">
        <FormInput type="password"
        name="password-confirm"
        onChange={this.handlePasswordConfirmChange}
        value={passwordConfirm}
        onKeyPress={this.submitIfEnter}/>
        </FormField>
        <FormField label={`札幌北高卒業期 (現1年生: ${info.firstGradeTimes}期, 現2年生: ${info.secondGradeTimes}期, 現3年生: ${info.thirdGradeTimes}期)`} htmlFor="times">
        <FormInput type="number" min="1" max={info.firstGradeTimes}
        name="times"
        value={times}
        onChange={this.handleTimesChange}
        onKeyPress={this.submitIfEnter}/>
        </FormField>
        <button className="submit-button" type="button" onClick={this.handleSubmit}>登録</button>
        </Form> */}
      </div>
    );
  }
}

export default connect()(Signup);
