import React, { PropTypes as T } from 'react';
import { Link } from 'react-router';
import ImageLoader from 'react-imageloader';

import useSheet from '../jss';
import { center } from '../jss/util';
import size from '../jss/size';

const sheet = {
  ...center,
  thumbnail: {
  },
};

class ClassThumbnail extends React.Component {

  static propTypes = {
    clazz: T.shape({
      thumbnail_url: T.string,
      times_ord: T.string.isRequired,
      grade: T.number.isRequired,
      ['class']: T.number.isRequired,
      title: T.string.isRequired,
    }),
    sheet: T.shape({
      classes: T.shape({
        thumbnail: T.string,
      }),
    }),
  }

  render() {
    const { sheet, clazz } = this.props;
    const { classes } = sheet;
    const thumbnail = clazz.thumbnail_url || '/static/img/no-icon.svg';
    const gradeClass = `${clazz.grade}-${clazz['class']}`;
    return (
      <Link to={`/gallery/${clazz.times_ord}/${gradeClass}`}>
        <ImageLoader className={classes.thumbnail}
                     src={thumbnail}
                     imgProps={{width: size.contentsWidth / 4, height: size.contentsWidth / 4 * (3 / 4)}}
                     preloader={() => <img className={classes.center} src="/static/img/loading.gif"/>}>
          oops!
        </ImageLoader>
        <p>{`${gradeClass} ${clazz.title}`}</p>
      </Link>
    );
  }
}

export default useSheet(ClassThumbnail, sheet);
