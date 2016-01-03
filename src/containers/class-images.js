import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import ImageLoader from 'react-imageloader';

import { loading, getImages, clearImages } from '../actions';
import useSheet from '../jss';
import size from '../jss/size';

const sheet = {
  images: {
    display: 'flex',
    'flex-flow': 'wrap',
    'justify-content': 'space-around',
    '& li': {
      'list-style-type': 'none',
    },
  },
  imageWrapper: {
    position: 'relative',
    overflow: 'hidden',
    width: size.contentsWidth / 4,
    height: size.contentsWidth / 4 * (3 / 4),
  },
  image: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    'max-width': '100%',
    'max-height': '100%',
    transform: 'translate(-50%, -50%)',
  },
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
    const { sheet, images } = this.props;
    const { classes } = sheet;
    return (
      <ul className={classes.images}>
        {images.map((image) => (
           <li key={image.id}>
             <a href={image.fullsizeUrl}>
               <ImageLoader className={classes.imageWrapper}
                            wrapper={React.DOM.div}
                            src={image.thumbnailUrl}
                            imgProps={{className: classes.image}}
                            preloader={() => <img src="/static/img/loading.gif"/>}>
                 画像を読み込めませんでした
               </ImageLoader>
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
