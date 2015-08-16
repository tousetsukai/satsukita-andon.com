import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../actions/gallery';
import { DESC } from '../../api-mock/SortType';
import { head } from './../utils';

const select = state => ({
  festivals: state.gallery.festivals
});

@connect(select)
export default class Top extends Component {
  static propTypes = {
    festivals: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentWillMount() {
    console.log('conponentWiillllCmo');
    actions.loadFestivals(DESC)(this.props.dispatch);
  }

  render() {
    const { festivals } = this.props;
    const renderedFestivals = festivals.map(fes => {
      const url = `/gallery/${fes.times}`;
      return (
        <li key={fes.times.raw()}>
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
