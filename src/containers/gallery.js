import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';

import { loading, getFestivals } from '../actions';
import FestivalThumbnail from '../components/festival-thumbnail';
import { meta } from '../util/helmet';

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
    const { festivals } = this.props;
    const randomFestival = () => {
      if (_.isEmpty(festivals)) {
        return {};
      } else {
        return festivals[_.random(0, festivals.length - 1)];
      }
    };
    return (
      <div className="container">
        <Helmet title="Gallery"
                meta={meta('Gallery', '行灯ギャラリー', randomFestival().thumbnail_url)}
        />
        <ul className="festival-thumbnails">
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

export default connect(
  state => ({
    festivals: state.gallery.festivals,
  })
)(Gallery);
