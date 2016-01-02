import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Alert } from 'elemental';
import ProgressBar from 'react-progress-bar-plus';

import useSheet from '../jss';
import Header from '../components/header';
import size from '../jss/size';
import Footer from '../components/footer';
import { me } from '../actions';

const sheet = {
  body: {
    'padding-bottom': 100,
  },
  container: {
    margin: `${size.headerHeight + 10}px auto 0`,
    padding: `0 ${size.padding}px`,
  },
  center: {
    margin: 'auto',
  },
  [`@media (min-width: ${size.pcWidth}px)`]: {
    container: {
      width: size.pcWidth,
    },
  },
};

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
    const { sheet } = this.props;
    const { classes } = sheet;
    const progress = () => {
      const p = this.props.loading ? 0 : 100;
      return <ProgressBar autoIncrement={true} percent={p} intervalTime={100}/>;
    };
    return (
      <div className={classes.body}>
        <Helmet
          titleTemplate="%s - 行灯職人への道"
        />
        {progress()}
        <Header/>
        <div className={classes.container}>
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
)(useSheet(App, sheet));
