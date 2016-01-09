import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import classnames from 'classnames';
import Lightbox from 'react-images';

import { loading, getImages, clearImages } from '../actions';
import * as classutil from '../util/class';
import ImageLoader from '../components/image-loader';

class ClassImages extends Component {

  static fetchData = ({ params, dispatch }) => {
    const classId = params.times + params.clazz;
    return dispatch(loading(getImages(classId)));
  }

  static propTypes = {
    images: T.arrayOf(T.object),
  }

  state = {
    lightboxIsOpen: false,
    currentImage: 0,
  }

  fetchData = (props) => {
    const { dispatch, clazz, of } = props;
    if (_.isEmpty(clazz)) {
      dispatch(clearImages);
    } else {
      const classId = classutil.classId(clazz);
      if (of !== classId) {
        dispatch(clearImages);
        return dispatch(loading(getImages(classId)));
      }
    }
  }
  componentWillMount = () => {
    this.fetchData(this.props);
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

  getMoreImages = () => {
    const { clazz, dispatch, count, allCount } = this.props;
    if (!_.isEmpty(clazz) && !this.props.loading && count < allCount) {
      const classId = classutil.classId(clazz);
      dispatch(loading(getImages(classId, count)));
    }
  }

  // load by scroll position
  handleScroll = (ev) => {
    if (window.innerHeight + ev.srcElement.body.scrollTop >= document.body.offsetHeight - 100) { // 100 is about footer size
      this.getMoreImages();
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
    const nextImage = this.state.currentImage + 1;
    this.setState({
      currentImage: nextImage,
    });
    if (nextImage + 1 === this.props.count) { // next image is the last image
      this.getMoreImages();
    }
  }
  renderLightbox = () => {
    // this is workaround for server-side react-images
    if (typeof document === 'undefined') {
      return <noscript/>;
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
                  backdropClosesModal={true}/>
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
                            cover={true}>
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
    of: state.clazz.imagesOf,
    count: state.clazz.imageCount,
    allCount: state.clazz.allImageCount,
    loading: state.app.loading,
  })
)(ClassImages);
