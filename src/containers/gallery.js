import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import axios from 'axios';

const getFestivals = (dispatch) => {
  return axios.get('http://localhost:6039/dev/festivals')
    .then(res => {
      return dispatch({ type: 'set_festivals', festivals: res.data.items });
    });
};

class Gallery extends Component {
  static fetchData({ store }) {
    return store.dispatch(getFestivals);
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
            <h1>{fes.times_ord} {fes.theme}</h1>
          </div>
        ))}
      </div>
    );
  }
}

export default connect(
  state => ({
    festivals: state.gallery.festivals
  }),
  dispatch => ({
    getFestivals: () => dispatch(getFestivals)
  })
)(Gallery);
