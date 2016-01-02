import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';

import { loading, getTimesClasses, clearTimesClasses } from '../actions';
import useSheet from '../jss';
import ClassThumbnail from '../components/class-thumbnail';

const sheet = {
  classes: {
    display: 'flex',
    'flex-flow': 'wrap',
    'align-items': 'center',
    '& li': {
      margin: 0,
      padding: 0,
      'list-style-type': 'none',
      width: 1024 / 4,
    },
  },
};

class Times extends Component {

  static fetchData({ params, dispatch }) {
    return dispatch(loading(getTimesClasses(params.times)));
  }

  componentWillMount() {
    const { params, dispatch, classes } = this.props;
    if (_.isEmpty(classes) || classes[0].times_ord !== params.times) {
      dispatch(clearTimesClasses);
      Times.fetchData({ params, dispatch });
    }
  }

  render() {
    const { params, sheet, classes } = this.props;
    const classNames = sheet.classes;
    return (
      <div>
        <Helmet
          title={`Gallery ${params.times}`}
        />
        <ul className={classNames.classes}>
          {classes.map((c) => (
             <li key={c.id}><ClassThumbnail clazz={c}/></li>
           ))
          }
        </ul>
      </div>
    );
  }
}

export default useSheet(connect(
  state => ({
    classes: state.times.classes,
  })
)(Times), sheet);
