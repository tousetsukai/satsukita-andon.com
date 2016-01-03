import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';

import { loading, getImages } from '../actions';
import useSheet from '../jss';

const sheet = {
};

class ClassImages extends Component {

  componentWillMount = () => {
    const { dispatch, clazz } = this.props;
    const classId = `${clazz.times_ord}${clazz.grade}-${clazz['class']}`;
    return dispatch(loading(getImages(classId)));
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
