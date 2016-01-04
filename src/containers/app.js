import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Alert } from 'elemental';
import ProgressBar from 'react-progress-bar-plus';

import Header from '../components/header';
import Footer from '../components/footer';
import { me } from '../actions';
import { meta } from '../util/helmet';

class App extends Component {

  static fetchData({ token, dispatch }) {
    if (token) {
      return dispatch(me(token));
    } else {
      return Promise.resolve();
    }
  }

  static childContextTypes = {
    user: React.PropTypes.object,
  }

  getChildContext = () => {
    return {
      user: this.props.user,
    };
  }

  render() {
    const progress = () => {
      const p = this.props.loading ? 0 : 100;
      return <ProgressBar autoIncrement={true} percent={p} intervalTime={100}/>;
    };
    return (
      <div className="app-wrapper">
        <Helmet
          titleTemplate="%s - 行灯職人への道"
          meta={meta()}
        />
        {progress()}
        <Header/>
        <div className="container">
          {this.props.showingError && <Alert type="danger">{this.props.error.message}</Alert>}
          {this.props.children}
        </div>
        <Footer/>
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.app.user,
    error: state.app.error,
    showingError: state.app.showingError,
    loading: state.app.loading,
  })
)(App);
