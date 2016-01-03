import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';

import { loading, getTimesClasses, clearTimesClasses } from '../actions';
import useSheet from '../jss';
import size from '../jss/size';
import ClassThumbnail from '../components/class-thumbnail';
import { meta } from '../util/helmet';

const sheet = {
  classes: {
    display: 'flex',
    'flex-flow': 'wrap',
    'align-items': 'center',
    'justify-content': 'space-around',
    '& li': {
      margin: 0,
      padding: 0,
      'list-style-type': 'none',
      width: size.contentsWidth / 4,
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
    const randomClass = () => {
      if (_.isEmpty(classes)) {
        return {};
      } else {
        return classes[_.random(0, classes.length - 1)];
      }
    };
    return (
      <div>
        <Helmet title={`Gallery ${params.times}`}
                meta={meta(`Gallery ${params.times}`, `${params.times}行灯ギャラリー`, randomClass().thumbnail_url)}
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
