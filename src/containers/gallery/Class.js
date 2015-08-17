import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/gallery';
import { head } from '../utils';
import OrdInt from '../../api-mock/OrdInt';

const select = state => ({
  classData: state.gallery.classData
});

@connect(select)
export default class Class extends Component {
  static propTypes = {
    classData: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this._times = OrdInt.parse(props.params.timesStr);
    this._grade = +props.params.grade;
    this._clazz = +props.params.clazz;
  }

  componentWillMount() {
    actions.loadClassData(this._times, this._grade, this._clazz)(this.props.dispatch);
  }

  render() {
    const { classData } = this.props;
    return (
      <div>
        {head({
          title: `Gallery ${this._times} ${this._grade}-${this._clazz}`,
          description: `Gallery ${this._times} ${this._grade}-${this._clazz}`
        })}
        <img src={classData.topImageUrl} />
        <p>{classData.title}</p>
      </div>
    );
  }
}
