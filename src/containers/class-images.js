import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { loading, getImages, clearImages } from '../actions';
import useSheet from '../jss';

const sheet = {
};

class ClassImages extends Component {

  static fetchData = ({ params, dispatch }) => {
    const classId = `${params.times}${params.clazz}`;
    return dispatch(loading(getImages(classId)));
  }

  componentWillMount = () => {
    const { dispatch, images, clazz } = this.props;
    const params = {
      times: clazz.times_ord,
      clazz: `${clazz.grade}-${clazz['class']}`,
    };
    if (_.isEmpty(images) || images[0].class_id !== clazz.id) {
      dispatch(clearImages);
      ClassImages.fetchData({ params, dispatch });
    }
  }

  static propTypes = {
    images: T.arrayOf(T.object),
  }

  render() {
    const { images } = this.props;
    return (
      <ul>
        {images.map((image) => (
           <li key={image.id}>
             <a href={image.fullsizeUrl}>
               <img src={image.thumbnailUrl}/>
             </a>
           </li>
         ))}
      </ul>
    );
  }
}

export default useSheet(connect(
  state => ({
    clazz: state.clazz.clazz,
    images: state.clazz.images,
  })
)(ClassImages), sheet);
