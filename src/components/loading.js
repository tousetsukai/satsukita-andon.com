import React from 'react';

import useSheet from '../jss';

const sheet = {
  wrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    'background-color': 'rgba(0, 0, 0, 0.5)',
  },
};

class Loading extends React.Component {

  render() {
    const { sheet } = this.props;
    const { classes } = sheet;
    return (
      <div className={classes.wrapper}></div>
    );
  }
}

export default useSheet(Loading, sheet);
