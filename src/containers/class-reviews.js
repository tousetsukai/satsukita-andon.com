import React, { Component, PropTypes as T } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';

import { loading, getReviews, clearReviews } from '../actions';
import * as classutil from '../util/class';
import Icon from '../components/icon';
import BreakableParagraph from '../components/breakable-paragraph';

class ClassReviews extends Component {

  static fetchData = ({ params, dispatch }) => {
    const classId = `${params.times}${params.clazz}`;
    return dispatch(loading(getReviews(classId)));
  }

  componentWillMount = () => {
    const { dispatch, reviewsOf, clazz } = this.props;
    if (!_.isEmpty(clazz)) {
      const params = {
        times: clazz.times_ord,
        clazz: classutil.classIdWithoutTimes(clazz),
      };
      if (reviewsOf !== (params.times + params.clazz)) {
        dispatch(clearReviews);
        ClassReviews.fetchData({ params, dispatch });
      }
    }
  }

  static propTypes = {
    reviews: T.arrayOf(T.object),
  }

  render() {
    const { reviews } = this.props;
    return (
      <ul className="padding-container class-reviews">
        {reviews.map((review) => (
           <li key={review.id} className="class-review">
             <div className="class-review-left">
               <Link to={`/users/${review.user.login}`}>
                 <Icon user={review.user}/>
                 <p>{review.user.name}</p>
               </Link>
             </div>
             <div className="class-review-right">
               <p className="class-review-title">{review.title}</p>
               <BreakableParagraph className="class-review-body" text={review.body}/>
             </div>
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
    reviewsOf: state.clazz.reviewsOf,
    reviewCount: state.clazz.reviewCount,
    allReviewCount: state.clazz.allReviewCount,
  })
)(ClassReviews);
