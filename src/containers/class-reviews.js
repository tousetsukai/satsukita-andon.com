import React, { Component, PropTypes as T } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';

import { loading, getReviews, clearReviews } from '../actions';
import * as classutil from '../util/class';
import Icon from '../components/icon';
import BreakableParagraph from '../components/breakable-paragraph';

class ClassReviews extends Component {

  static propTypes = {
    reviews: T.arrayOf(T.object),
  }

  static fetchData = ({ params, dispatch }) => {
    const classId = `${params.times}${params.clazz}`;
    return dispatch(loading(getReviews(classId)));
  }

  fetchData = (props) => {
    const { dispatch, reviewsOf, clazz } = props;
    if (_.isEmpty(clazz)) {
      return dispatch(clearReviews);
    } else {
      const classId = classutil.classId(clazz);
      if (reviewsOf !== classId) {
        return dispatch(loading(getReviews(classId)));
      }
    }
  }

  componentWillMount = () => {
    this.fetchData(this.props);
  }

  componentWillUpdate = (nextProps) => {
    // empty => non empty, non empty => empty, non empty => another class
    if (_.isEmpty(this.props.clazz)) {
      !_.isEmpty(nextProps.clazz) && this.fetchData(nextProps);
    } else {
      const cond = _.isEmpty(nextProps.clazz) ||
                   classutil.classId(this.props.clazz) !== classutil.classId(nextProps.clazz);
      cond && this.fetchData(nextProps);
    }
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
