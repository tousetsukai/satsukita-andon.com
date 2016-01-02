import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';

import { loading, getClass } from '../actions';

class Class extends Component {

  static fetchData({ params, dispatch }) {
    return dispatch(loading(getClass(`${params.times}${params.clazz}`)));
  }

  componentWillMount() {
    const { params, dispatch, clazz } = this.props;
    if (_.isEmpty(clazz) ||
        !(`${clazz.times_ord}${clazz.grade}-${clazz.class}` ===
          `${params.times}${params.clazz}`)) {
      Class.fetchData({ params, dispatch });
    }
  }

  render() {
    const { clazz } = this.props;
    const headerImage = clazz.header_image_url || '/static/img/no-icon.svg';
    return (
      <div>
        <Helmet
          title={`${clazz.times_ord}${clazz.grade}-${clazz.class}`}
        />
        <div>
          <h1>{`${clazz.times_ord}${clazz.grade}-${clazz.class} ${clazz.title}`}</h1>
          <img src={headerImage}/>
          <p>{JSON.stringify(clazz)}</p>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    clazz: state.clazz.clazz,
  })
)(Class);
