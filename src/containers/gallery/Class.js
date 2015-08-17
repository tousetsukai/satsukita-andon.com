import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/gallery';
import { head } from '../utils';
import OrdInt from '../../api-mock/OrdInt';

const select = state => ({
  classData: state.gallery.classData
});
const bind = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

@connect(select, bind)
export default class Class extends Component {
  static propTypes = {
    classData: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this._times = OrdInt.parse(props.params.timesStr);
    this._grade = +props.params.grade;
    this._clazz = +props.params.clazz;
  }

  componentWillMount() {
    this.props.actions.loadClassData(this._times, this._grade, this._clazz);
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
