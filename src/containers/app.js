import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import useSheet from '../jss';
import api from '../api';
import Header, { headerHeight } from '../components/header';

const sheet = {
  container: {
    margin: `${headerHeight + 10}px auto 0`,
  },
  '@media (min-width: 1024px)': {
    container: {
      width: '1024px',
    },
  },
};

const getUser = (token) => (dispatch) => api.getUser(token)
  .then(res => dispatch({ type: 'app:user:set', user: res.data }));

class App extends Component {

  static fetchData({ token, dispatch }) {
    if (token) {
      return dispatch(getUser(token));
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
    return (
      <div>
        <Helmet
          titleTemplate="%s - 行灯職人への道"
        />
        <Header/>
        <div className={classes.container}>
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
  })
)(useSheet(App, sheet));
