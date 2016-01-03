import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';

import { loading, getClass, clearClass } from '../actions';
import ClassHeader from '../components/class-header';
import ClassTabs from '../components/class-tabs';
import ClassBasic from './class-basic';
import ClassReviews from './class-reviews';
import ClassImages from './class-images';

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

  renderContent = (tab) => {
    switch (tab) {
    case 'basic':
      return <ClassBasic/>;
    case 'reviews':
      return <ClassReviews/>;
    case 'images':
      return <ClassImages/>;
    default:
      return <ClassBasic/>;
    }
  }

  renderClass = (clazz) => {
    const { location } = this.props;
    const tab = location.query.tab || 'basic';
    return (
      <div>
        <ClassHeader clazz={clazz}/>
        <ClassTabs tab={tab} clazz={clazz}/>
        {this.renderContent(tab)}
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
