import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../actions/gallery';
import { head } from './../utils';
import OrdInt from '../../api-mock/OrdInt';

const select = state => ({
  classes: state.gallery.classes
});
const bind = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

@connect(select, bind)
export default class Times extends Component {
  static propTypes = {
    classes: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this._times = OrdInt.parse(props.params.timesStr);
  }

  componentDidMount() {
    this.props.actions.loadClassesOf(this._times);
  }

  render() {
    const { classes } = this.props;
    const renderedClasses = classes.map((clazz, i) => {
      const url = `/gallery/${clazz.times}/${clazz.grade}/${clazz.clazz}`;
      return (
        <li key={i}>
          <Link to={url}>
            <img src={clazz.topImageUrl} />
            <p>{`${clazz.times} ${clazz.grade}-${clazz.clazz}`}</p>
          </Link>
        </li>
      );
    });
    return (
      <div>
        {head({ title: `Gallery ${this._times}`, description: `Gallery ${this._times}` })}
        <ul>{renderedClasses}</ul>
      </div>
    );
  }
}
