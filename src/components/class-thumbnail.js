import React, { PropTypes as T } from 'react';
import { Link } from 'react-router';
import ImageLoader from 'react-imageloader';

import useSheet from '../jss';
import { center } from '../jss/util';
import color from '../jss/color';
import size from '../jss/size';

const sheet = {
  ...center,
  thumbnail: {
    position: 'relative',
    transition: '0.2s linear',
    '&:hover': {
      'box-shadow': '0 0 20px 3px black',
      'z-index': '10',
    },
  },
  title: {
    color: color.text,
    position: 'absolute',
    display: 'inline-block',
    width: '100%',
    bottom: 0,
    left: 0,
    margin: 'auto',
    'text-align': 'center',
    'font-size': 20,
    'background-color': 'rgba(0, 0, 0, 0.5)',
    padding: '3px',
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
    const gradeClassJa = `${clazz.grade}年${clazz['class']}組`;
    const wrap = (props, children) => (
      <div {...props}>
        {children}
        <p className={classes.title}>{gradeClassJa + ' ' + clazz.title}</p>
      </div>
    );
    return (
      <Link to={`/gallery/${clazz.times_ord}/${gradeClass}`}>
        <ImageLoader className={classes.thumbnail}
                     wrapper={wrap}
                     src={thumbnail}
                     imgProps={{width: size.contentsWidth / 4, height: size.contentsWidth / 4 * (3 / 4)}}
                     preloader={() => <img className={classes.center} src="/static/img/loading.gif"/>}>
          oops!
        </ImageLoader>
      </Link>
    );
  }
}

export default useSheet(ClassThumbnail, sheet);
