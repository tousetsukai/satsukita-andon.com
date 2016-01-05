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

  static propTypes = {
    images: T.arrayOf(T.object),
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

  componentDidMount = () => {
    if (window) {
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount = () => {
    if (window) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  handleScroll = (ev) => {
    if (window.innerHeight + ev.srcElement.body.scrollTop >= document.body.offsetHeight * 0.9) {
      const { clazz, dispatch, count, allCount } = this.props;
      if (!this.props.loading && count < allCount) {
        const classId = `${clazz.times_ord}${clazz.grade}-${clazz['class']}`;
        dispatch(loading(getImages(classId, count)));
      }
    }
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
    count: state.clazz.imageCount,
    allCount: state.clazz.allImageCount,
    loading: state.app.loading,
  })
)(ClassImages);
