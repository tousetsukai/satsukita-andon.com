import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';

import { loading, getFestivals, getTimesClasses, getClass, clearClass, all }from '../actions';
import ClassHeader from '../components/class-header';
import ClassTabs from '../components/class-tabs';
import NavBar from '../components/nav-bar';
import { meta } from '../util/helmet';

import * as classutil from '../util/class';

class Class extends Component {

  static fetchData({ params, dispatch }) {
    return dispatch(loading(all([
      getFestivals,
      getTimesClasses(params.times),
      getClass(`${params.times}${params.clazz}`),
    ])));
  }

  fetchData = (props) => {
    const { params, dispatch, festivals, classes, clazz } = props;
    const actions = [];
    if (_.isEmpty(festivals)) {
      actions.push(getFestivals);
    }
    if (_.isEmpty(classes) || classes[0].times_ord !== params.times) {
      actions.push(getTimesClasses(params.times));
    }
    const classId = `${params.times}${params.clazz}`;
    if (_.isEmpty(clazz) || classutil.classId(clazz) !== classId) {
      actions.push(getClass(classId));
      dispatch(clearClass);
    }
    if (!_.isEmpty(actions)) {
      return dispatch(loading(all(actions)));
    } else {
      return Promise.resolve(true);
    }
  }

  componentWillMount() {
    this.fetchData(this.props);
  }

  componentWillUpdate(nextProps) {
    // when url changed
    if (nextProps.params.times !== this.props.params.times ||
        nextProps.params.clazz !== this.props.params.clazz) {
      this.fetchData(nextProps);
    }
  }

  renderClass = () => {
    const { location, clazz } = this.props;
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
    const { params, festivals } = this.props;
    const times = params.times;
    const items = festivals.map(fes => ({
      id: fes.times_ord,
      label: fes.times_ord,
      link: `/gallery/${fes.times_ord}`,
    }));
    return <NavBar activeId={times} items={items}/>;
  }

  renderTimesNavBar = () => {
    const { params, classes } = this.props;
    const classId = params.clazz;
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
        {this.renderClass()}
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
