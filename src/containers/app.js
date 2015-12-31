import React, { Component } from 'react';
import Helmet from 'react-helmet';

import useSheet from '../jss';
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

class App extends Component {
  render() {
    const { classes } = this.props.sheet;
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

export default useSheet(App, sheet);
