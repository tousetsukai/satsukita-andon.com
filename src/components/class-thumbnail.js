import React, { PropTypes as T } from 'react';
import { Link } from 'react-router';
import ImageLoader from 'react-imageloader';

import * as classutil from '../util/class';
import Loader from './loader';

class ClassThumbnail extends React.Component {

  static propTypes = {
    clazz: T.shape({
      thumbnail_url: T.string,
      times_ord: T.string.isRequired,
      grade: T.number.isRequired,
      ['class']: T.number.isRequired,
      title: T.string.isRequired,
    }),
  }

  render() {
    const { clazz } = this.props;
    const thumbnail = clazz.thumbnail_url || '/static/img/no-icon.svg';
    const gradeClassJa = classutil.classNameWithoutTimesJa(clazz);
    const wrap = (props, children) => (
      <div {...props}>
        {children}
        <p className="class-title">{gradeClassJa + ' ' + clazz.title}</p>
      </div>
    );
    return (
      <Link to={`/gallery/${classutil.classIdWithSlash(clazz)}`}>
        <ImageLoader className="class-thumbnail"
                     wrapper={wrap}
                     src={thumbnail}
                     imgProps={{className: 'class-image'}}
                     preloader={() => <Loader/>}>
          画像を読み込めませんでした
        </ImageLoader>
      </Link>
    );
  }
}

export default ClassThumbnail;
