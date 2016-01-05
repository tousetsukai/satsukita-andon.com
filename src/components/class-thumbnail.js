import React, { PropTypes as T } from 'react';
import { Link } from 'react-router';
import ImageLoader from 'react-imageloader';

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
    const gradeClass = `${clazz.grade}-${clazz['class']}`;
    const gradeClassJa = `${clazz.grade}年${clazz['class']}組`;
    const wrap = (props, children) => (
      <div {...props}>
        {children}
        <p className="class-title">{gradeClassJa + ' ' + clazz.title}</p>
      </div>
    );
    return (
      <Link to={`/gallery/${clazz.times_ord}/${gradeClass}`}>
        <ImageLoader className="class-thumbnail"
                     wrapper={wrap}
                     src={thumbnail}
                     imgProps={{className: 'class-image'}}
                     preloader={() => <img src="/static/img/loading.gif"/>}>
          oops!
        </ImageLoader>
      </Link>
    );
  }
}

export default ClassThumbnail;
