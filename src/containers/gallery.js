import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import api from '../api';

const getFestivals = (dispatch) => api.getFestivals()
  .then(res => dispatch({ type: 'set_festivals', festivals: res.data.items }));

class Gallery extends Component {

  static fetchData({ dispatch }) {
    return dispatch(getFestivals);
  }

  componentWillMount() {
    if (this.props.festivals.length === 0) {
      Gallery.fetchData({ dispatch: this.props.dispatch });
    }
  }

  render() {
    const { festivals } = this.props;
    return (
      <div>
        <Helmet
          title="Gallery"
        />
        {festivals.map((fes) => (
          <div key={fes.times}>
            <h1>
              <Link to={`/gallery/${fes.times_ord}`}>
                {fes.times_ord} {fes.theme}
              </Link>
            </h1>
          </div>
        ))}
      </div>
    );
  }
}

export default connect(
  state => ({
    festivals: state.gallery.festivals
  })
)(Gallery);
