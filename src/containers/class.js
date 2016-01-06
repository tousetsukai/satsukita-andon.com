import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';

import { loading, getClass, clearClass } from '../actions';
import ClassHeader from '../components/class-header';
import ClassTabs from '../components/class-tabs';
import { meta } from '../util/helmet';

import * as classutil from '../util/class';

class Class extends Component {

  static fetchData({ params, dispatch }) {
    return dispatch(loading(getClass(`${params.times}${params.clazz}`)));
  }

  componentWillMount() {
    const { params, dispatch, clazz } = this.props;
    if (_.isEmpty(clazz) ||
        !(classutil.classId(clazz) === `${params.times}${params.clazz}`)) {
      dispatch(clearClass);
      Class.fetchData({ params, dispatch });
    }
  }

  renderClass = (clazz) => {
    const { location } = this.props;
    const tab = location.pathname.substring(`/gallery/${classutil.classIdWithSlash(clazz)}/`.length) || 'images';
    return (
      <div>
        <ClassHeader clazz={clazz}/>
        <ClassTabs tab={tab} clazz={clazz}/>
        {this.props.children}
      </div>
    );
  }

  render() {
    const { clazz } = this.props;
    const classTitle = `${classutil.classNameJa(clazz)} ${clazz.title}`;
    return (
      <div>
        <Helmet
          title={classTitle}
          meta={meta(classTitle, clazz.description || `${classTitle} の写真や記録など`, clazz.header_image_url)}
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
