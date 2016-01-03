import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';

import { loading, getClass, clearClass } from '../actions';

import size from '../jss/size';

class Class extends Component {

  static fetchData({ params, dispatch }) {
    return dispatch(loading(getClass(`${params.times}${params.clazz}`)));
  }

  componentWillMount() {
    const { params, dispatch, clazz } = this.props;
    if (_.isEmpty(clazz) ||
        !(`${clazz.times_ord}${clazz.grade}-${clazz.class}` ===
          `${params.times}${params.clazz}`)) {
      dispatch(clearClass);
      Class.fetchData({ params, dispatch });
    }
  }

  renderClass = (clazz) => {
    const headerImage = clazz.header_image_url || '/static/img/no-icon.svg';
    return (
      <div>
        <img src={headerImage} width={size.contentsWidth}/>
        <h1>{`${clazz.times_ord}${clazz.grade}-${clazz.class} ${clazz.title}`}</h1>
        <p>{JSON.stringify(clazz)}</p>
      </div>
    );
  }

  render() {
    const { clazz } = this.props;
    return (
      <div>
        <Helmet
          title={`${clazz.times_ord}${clazz.grade}-${clazz.class}`}
        />
        {_.isEmpty(clazz) || this.renderClass(clazz)}
      </div>
    );
  }
}

export default connect(
  state => ({
    clazz: state.clazz.clazz,
  })
)(Class);
