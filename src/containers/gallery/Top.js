import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../actions/gallery';
import { DESC } from '../../api-mock/SortType';
import { head } from './../utils';

const select = state => ({
  festivals: state.gallery.festivals
});
const bind = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

@connect(select, bind)
export default class Top extends Component {
  static propTypes = {
    festivals: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.actions.loadFestivals(DESC);
  }

  render() {
    const { festivals } = this.props;
    const renderedFestivals = festivals.map((fes, i) => {
      const url = `/gallery/${fes.times}`;
      return (
        <li key={i}>
          <Link to={url}>
            <img src={fes.imageUrl} />
            <p>{fes.times.toString()} {fes.theme}</p>
          </Link>
        </li>
      );
    });
    return (
      <div>
        {head({ title: 'Gallery', description: 'Gallery Top Page' })}
        <ul>{renderedFestivals}</ul>
      </div>
    );
  }
}
