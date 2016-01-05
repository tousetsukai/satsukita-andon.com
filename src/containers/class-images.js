import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import ImageLoader from 'react-imageloader';

import { loading, getImages, clearImages } from '../actions';

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
    const wrap = (image) => (props, children) => {
      return (
        <a href={image.fullsizeUrl} {...props}>
          {children}
        </a>
      );
    };
    return (
      <ul className="class-images">
        {images.map((image) => (
           <li key={image.id}>
             <ImageLoader className="class-image-wrapper"
                          wrapper={wrap(image)}
                          src={image.thumbnailUrl}
                          imgProps={{className: 'class-image'}}
                          preloader={() => <img src="/static/img/loading.gif"/>}>
               画像を読み込めませんでした
             </ImageLoader>
           </li>
         ))}
      </ul>
    );
  }
}

export default connect(
  state => ({
    clazz: state.clazz.clazz,
    images: state.clazz.images,
  })
)(ClassImages);
