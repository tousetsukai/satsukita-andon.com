import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Form, FormField, FormRow, FormInput, Checkbox } from 'elemental';

import IconUploader from '../../components/icon-uploader';
import { setIcon, updateMe } from '../../actions';

class Settings extends Component {

  state = {
    login: '', // not visible
    name: '',
    biography: '',
    class_first: undefined,
    class_second: undefined,
    class_third: undefined,
    chief_first: false,
    chief_second: false,
    chief_third: false,
    email: '', // not visible

    loading: false,
    success: false,
  };

  componentWillMount() {
    const { user } = this.props;
    console.log(user);
    this.setState({
      login: user.login,
      name: user.name,
      biography: user.biography,
      class_first: user.class_first.class,
      class_second: user.class_second.class,
      class_third: user.class_third.class,
      chief_first: user.chief_first,
      chief_second: user.chief_second,
      chief_third: user.chief_third,
      email: user.email,
    });
  }

  // normal settings
  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  handleBiographyChange = (e) => {
    this.setState({
      biography: e.target.value,
    });
  };
  handleClassFirstChange = (e) => {
    this.setState({
      class_first: e.target.value,
    });
  };
  handleClassSecondChange = (e) => {
    this.setState({
      class_second: e.target.value,
    });
  };
  handleClassThirdChange = (e) => {
    this.setState({
      class_third: e.target.value,
    });
  };
  handleChiefFirstChange = (e) => {
    this.setState({
      chief_first: e.target.checked,
    });
  };
  handleChiefSecondChange = (e) => {
    this.setState({
      chief_second: e.target.checked,
    });
  };
  handleChiefThirdChange = (e) => {
    this.setState({
      chief_third: e.target.checked,
    });
  };

  handleSubmit = () => {
    const handleNaN = (k) => {
      const n = parseInt(this.state[k]);
      return isNaN(n) ? undefined : n;
    };
    const params = {
      ...this.state,
      class_first: handleNaN('class_first'),
      class_second: handleNaN('class_second'),
      class_third: handleNaN('class_third'),
    };

    this.setState({
      loading: true,
      success: false,
    });
    this.props.dispatch(updateMe(params)).then(() => {
      this.setState({
        loading: false,
        success: true,
      });
    });
  };

  // icon settings
  handleIconChange = (url) => {
    this.props.dispatch(setIcon(url));
  };

  render() {
    const { user } = this.props;
    const state = this.state;
    return (
      <div>
        <h2>アカウント情報の変更</h2>
        <Form>

          <FormField label="ユーザー名" htmlFor="name">
            <FormInput autofocus type="text"
                       name="name"
                       defaultValue={user.name}
                       onChange={this.handleNameChange}/>
          </FormField>
          <FormField label="プロフィール" htmlFor="biography">
            <FormInput multiline type="text"
                       name="biography"
                       defaultValue={user.biography}
                       onChange={this.handleBiographyChange}/>
          </FormField>

          <FormRow>
            <FormField label={'1年時のクラス (1年1組なら"1")'} htmlFor="class-first">
              <FormInput type="number" min="1" max="15"
                         name="class-first"
                         defaultValue={user.class_first.class}
                         onChange={this.handleClassFirstChange}/>
            </FormField>
            <FormField>
              <Checkbox label="1年時に行灯責任者" onChange={this.handleChiefFirstChange} defaultChecked={state.chief_first}/>
            </FormField>
            <FormField label={'2年時のクラス (2年1組なら"1")'} htmlFor="class-second">
              <FormInput type="number" min="1" max="15"
                         name="class-second"
                         defaultValue={user.class_second.class}
                         onChange={this.handleClassSecondChange}/>
            </FormField>
            <FormField>
              <Checkbox label="2年時に行灯責任者" onChange={this.handleChiefSecondChange} defaultChecked={state.chief_second}/>
            </FormField>
            <FormField label={'3年時のクラス (3年1組なら"1")'} htmlFor="class-third">
              <FormInput type="number" min="1" max="15"
                         name="class-third"
                         defaultValue={user.class_third.class}
                         onChange={this.handleClassThirdChange}/>
            </FormField>
            <FormField>
              <Checkbox label="3年時に行灯責任者" onChange={this.handleChiefThirdChange} defaultChecked={state.chief_third}/>
            </FormField>
          </FormRow>

          {state.loading ? <p>更新しています...</p> : <button className="submit-button" type="button" onClick={this.handleSubmit}>送信</button>}
          {state.success && <p>更新しました</p>}
        </Form>
        <h2 style={{marginTop: 30}}>アイコンの変更</h2>
        <IconUploader onIconChange={this.handleIconChange}/>
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.app.user,
  })
)(Settings);
