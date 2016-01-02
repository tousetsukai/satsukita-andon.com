import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';

import { loading, getFestivals } from '../actions';
import FestivalThumbnail from '../components/festival-thumbnail';
import useSheet from '../jss';
import size from '../jss/size';

const sheet = {
  thumbnails: {
    display: 'flex',
    'flex-flow': 'wrap',
    'align-items': 'center',
    'justify-content': 'space-around',
    '& li': {
      margin: 0,
      padding: 0,
      'list-style-type': 'none',
      width: size.contentsWidth / 4,
    },
  },
};

class Gallery extends Component {

  static fetchData({ dispatch }) {
    return dispatch(loading(getFestivals));
  }

  componentWillMount() {
    if (_.isEmpty(this.props.festivals)) {
      Gallery.fetchData({ dispatch: this.props.dispatch });
    }
  }

  render() {
    const { sheet, festivals } = this.props;
    const { classes } = sheet;
    return (
      <div>
        <Helmet
          title="Gallery"
        />
        <ul className={classes.thumbnails}>
          {festivals.map((fes) =>
            <li key={fes.times}>
              <Link to={`/gallery/${fes.times_ord}`}>
                <FestivalThumbnail festival={fes}/>
              </Link>
            </li>)
          }
        </ul>
      </div>
    );
  }
}

export default useSheet(connect(
  state => ({
    festivals: state.gallery.festivals,
  })
)(Gallery), sheet);
