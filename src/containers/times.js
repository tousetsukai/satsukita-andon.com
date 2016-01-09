import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';

import { loading, getTimesClasses, clearTimesClasses, all, getFestivals } from '../actions';
import ClassThumbnail from '../components/class-thumbnail';
import NavBar from '../components/nav-bar';
import { meta } from '../util/helmet';

class Times extends Component {

  static fetchData({ params, dispatch }) {
    return dispatch(loading(all([
      getFestivals,
      getTimesClasses(params.times),
    ])));
  }

  fetchData = (props) => {
    const { dispatch, params, festivals, classesOf } = props;
    const actions = [];
    if (_.isEmpty(festivals)) {
      actions.push(getFestivals);
    }
    if (classesOf !== params.times) {
      dispatch(clearTimesClasses);
      actions.push(getTimesClasses(params.times));
    }
    if (!_.isEmpty(actions)) {
      return dispatch(loading(all(actions)));
    } else {
      return Promise.resolve(true);
    }
  };

  componentWillMount() {
    this.fetchData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.params.times !== this.props.params.times) {
      this.fetchData(nextProps);
    }
  }

  renderTimes = (grade, classes) => {
    return (
      <section className="times-classes-wrapper">
        <h1 className="grade">{grade}年生の行灯</h1>
        <ul className="times-classes">
          {classes.map((c) => (
             <li key={c.id}><ClassThumbnail clazz={c}/></li>
           ))
          }
        </ul>
      </section>
    );
  };

  renderFestivalNavBar = () => {
    const { params, festivals } = this.props;
    const times = params.times;
    const items = festivals.map(fes => ({
      id: fes.times_ord,
      label: fes.times_ord,
      link: `/gallery/${fes.times_ord}`,
    }));
    return <NavBar activeId={times} items={items}/>;
  };

  render() {
    const { params, classes } = this.props;
    const randomClass = () => {
      if (_.isEmpty(classes)) {
        return {};
      } else {
        return classes[_.random(0, classes.length - 1)];
      }
    };
    const first = classes.filter((c) => c.grade === 1);
    const second = classes.filter((c) => c.grade === 2);
    const third = classes.filter((c) => c.grade === 3);
    return (
      <div className="container">
        <Helmet title={`Gallery ${params.times}`}
                meta={meta(`Gallery ${params.times}`, `${params.times}行灯ギャラリー`, randomClass().thumbnail_url)}
        />
        {this.renderFestivalNavBar()}
        {!_.isEmpty(third) && this.renderTimes(3, third)}
        {!_.isEmpty(second) && this.renderTimes(2, second)}
        {!_.isEmpty(first) && this.renderTimes(1, first)}
      </div>
    );
  }
}

export default connect(
  state => ({
    festivals: state.gallery.festivals,
    classes: state.times.classes,
    classesOf: state.times.classesOf,
  })
)(Times);
