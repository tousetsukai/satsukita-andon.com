import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';

import api from '../api';

const getClasses = (times) => (dispatch) => api.getClasses({ times, limit: 50 })
  .then(res => dispatch({ type: 'times:set', classes: res.data.items }));

class Times extends Component {

  static fetchData({ params, dispatch }) {
    return dispatch(getClasses(params.times));
  }

  componentWillMount() {
    const { params, dispatch, classes } = this.props;
    if (_.isEmpty(classes) || classes[0].times_ord !== params.times) {
      Times.fetchData({ params, dispatch });
    }
  }

  render() {
    const { params, classes } = this.props;
    return (
      <div>
        <Helmet
          title={`Gallery ${params.times}`}
        />
        {classes.map((c) => (
          <div key={c.id}>
            <h1>
              <Link to={`/gallery/${params.times}/${c.grade}-${c['class']}`}>
                {`${c.times_ord}${c.grade}-${c['class']} ${c.title}`}
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
    classes: state.times.classes
  })
)(Times);
