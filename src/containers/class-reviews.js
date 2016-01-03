import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';

import { loading, getReviews } from '../actions';
import useSheet from '../jss';

const sheet = {
};

class ClassReviews extends Component {

  componentWillMount = () => {
    const { dispatch, clazz } = this.props;
    const classId = `${clazz.times_ord}${clazz.grade}-${clazz['class']}`;
    return dispatch(loading(getReviews(classId)));
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

export default useSheet(connect(
  state => ({
    clazz: state.clazz.clazz,
    reviews: state.clazz.reviews,
  })
)(ClassReviews), sheet);
