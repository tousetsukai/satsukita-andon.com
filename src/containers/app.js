import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Alert } from 'elemental';
import ProgressBar from 'react-progress-bar-plus';

import useSheet from '../jss';
import Header, { headerHeight } from '../components/header';
// import Loading from '../components/loading';
import { me } from '../actions';

const sheet = {
  container: {
    margin: `${headerHeight + 10}px auto 0`,
  },
  center: {
    margin: 'auto',
  },
  '@media (min-width: 1024px)': {
    container: {
      width: '1024px',
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
      <div>
        <Helmet
          titleTemplate="%s - 行灯職人への道"
        />
        {progress()}
        <Header/>
        <div className={classes.container}>
          {this.props.showingError && <Alert type="danger">{this.props.error.message}</Alert>}
          {this.props.children}
        </div>
        <footer className={classes.footer}>
        </footer>
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
