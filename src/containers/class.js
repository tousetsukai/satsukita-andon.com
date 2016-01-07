import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';

import { loading, getClass, clearClass } from '../actions';
import ClassHeader from '../components/class-header';
import ClassTabs from '../components/class-tabs';
import NavBar from '../components/nav-bar';
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

  renderFestivalNavBar = () => {
    const { clazz, festivals } = this.props;
    const times = clazz.times_ord;
    const items = festivals.map(fes => ({
      id: fes.times_ord,
      label: fes.times_ord,
      link: `/gallery/${fes.times_ord}`,
    }));
    return <NavBar activeId={times} items={items}/>;
  }

  renderTimesNavBar = () => {
    const { clazz, classes } = this.props;
    const classId = classutil.classIdWithoutTimes(clazz);
    const items = classes.map(c => ({
      id: classutil.classIdWithoutTimes(c),
      label: classutil.classNameWithoutTimes(c),
      link: `/gallery/${classutil.classIdWithSlash(c)}`,
    }));
    return <NavBar activeId={classId} items={items}/>;
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
        {this.renderFestivalNavBar()}
        {this.renderTimesNavBar()}
        {_.isEmpty(clazz) || this.renderClass(clazz)}
      </div>
    );
  }
}

export default connect(
  state => ({
    festivals: state.gallery.festivals,
    classes: state.times.classes,
    clazz: state.clazz.clazz,
  })
)(Class);
