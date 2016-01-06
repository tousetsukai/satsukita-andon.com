import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import ImageLoader from 'react-imageloader';
import classnames from 'classnames';
import Lightbox from 'react-images';

import { loading, getImages, clearImages } from '../actions';

class ClassImages extends Component {

  static fetchData = ({ params, dispatch }) => {
    const classId = `${params.times}${params.clazz}`;
    return dispatch(loading(getImages(classId)));
  }

  static propTypes = {
    images: T.arrayOf(T.object),
  }

  state = {
    lightboxIsOpen: false,
    currentImage: 0,
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

  // load by scroll position
  handleScroll = (ev) => {
    if (window.innerHeight + ev.srcElement.body.scrollTop >= document.body.offsetHeight - 100) { // 100 is about footer size
      const { clazz, dispatch, count, allCount } = this.props;
      if (!this.props.loading && count < allCount) {
        const classId = `${clazz.times_ord}${clazz.grade}-${clazz['class']}`;
        dispatch(loading(getImages(classId, count)));
      }
    }
  }

  // lightbox methods
  openLightbox = (index) => (event) => {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrev = () => {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }
  renderLightbox = () => {
    // this is workaround for server-side react-images
    if (typeof document === 'undefined') {
      return undefined;
    } else {
      const { images } = this.props;
      const lightboxImages = images.map(image => ({
        src: image.fullsize_url,
        caption: `taken by ${image.user.login}`,
      }));
      return (
        <Lightbox currentImage={this.state.currentImage}
                  images={lightboxImages}
                  isOpen={this.state.lightboxIsOpen}
                  onClickPrev={this.gotoPrev}
                  onClickNext={this.gotoNext}
                  onClose={this.closeLightbox}
                  height={1500}
                  width={2000}
                  showImageCount={true}
                  showCloseButton={true}
                  showCaption={true}/>
      );
    }
  }

  render() {
    const { images } = this.props;
    const wrap = (index) => (props, children) => {
      return (
        <a href="#" onClick={this.openLightbox(index)} {...props}>
          {children}
        </a>
      );
    };
    return (
      <div>
        <ul className="class-images">
          {images.map((image, i) => (
             <li key={image.id}>
               <ImageLoader className="class-image-wrapper"
                            wrapper={wrap(i)}
                            src={image.thumbnail_url}
                            imgProps={{className: 'class-image'}}
                            preloader={() => <img src="/static/img/loading.gif"/>}>
                 画像を読み込めませんでした
               </ImageLoader>
             </li>
           ))}
        </ul>
        {this.renderLightbox()}
        <p className={classnames({
          'class-image-not-loading': !this.props.loading,
          'class-image-loading': this.props.loading,
        })}>
          loading...
        </p>
      </div>
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
