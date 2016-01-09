import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import NotificationSystem from 'react-notification-system';
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

  showError = (message) => {
    this.refs.notification.addNotification({
      message: message,
      level: 'error',
    });
  }

  componentDidMount = () => {
    if (this.props.showingError) {
      this.showError(this.props.error.message);
    }
  }
  componentDidUpdate = (prevProps) => {
    if (!prevProps.showingError && this.props.showingError) {
      this.showError(this.props.error.message);
    }
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
        <NotificationSystem ref="notification" style={{
          NotificationItem: {
            error: {
              borderTop: 'none',
              borderLeft: '2px solid red',
              backgroundColor: 'rgba(0, 20, 20, 1)',
              color: 'rgb(240, 240, 240)',
              boxShadow: 'none',
              WebkitBoxShadow: 'none',
              MozBoxShadow: 'none',
            },
          },
          Dismiss: {
            error: {
              backgroundColor: '#666666',
              color: '#222222',
            }
          },
        }}/>

        {this.props.children}
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
