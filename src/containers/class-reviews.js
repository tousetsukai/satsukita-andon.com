import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { loading, getReviews, clearReviews } from '../actions';

class ClassReviews extends Component {

  static fetchData = ({ params, dispatch }) => {
    const classId = `${params.times}${params.clazz}`;
    return dispatch(loading(getReviews(classId)));
  }

  componentWillMount = () => {
    const { dispatch, reviews, clazz } = this.props;
    const params = {
      times: clazz.times_ord,
      clazz: `${clazz.grade}-${clazz['class']}`,
    };
    if (_.isEmpty(reviews) || reviews[0].class_id !== clazz.id) {
      dispatch(clearReviews);
      ClassReviews.fetchData({ params, dispatch });
    }
  }

  static propTypes = {
    reviews: T.arrayOf(T.object),
  }

  render() {
    const { reviews } = this.props;
    return (
      <ul>
        {reviews.map((review) => (
           <li key={review.id}>
             <p>{review.body}</p>
           </li>
         ))}
      </ul>
    );
  }
}

export default connect(
  state => ({
    clazz: state.clazz.clazz,
    reviews: state.clazz.reviews,
  })
)(ClassReviews);
