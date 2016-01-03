import React, { PropTypes as T } from 'react';
import ImageLoader from 'react-imageloader';

import useSheet from '../jss';
import { center } from '../jss/util';
import color from '../jss/color';
import size from '../jss/size';

const sheet = {
  center,
  header: {
    width: size.contentsWidth,
    height: size.classHeaderHeight,
    overflow: 'hidden',
    position: 'relative',
  },
  titleWrapper: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    padding: '40px 10px 10px',
    'background': 'linear-gradient(top, transparent 0%, black 100%)',
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
  },
  id: {
    color: color.text,
    'font-size': 20,
  },
  title: {
    color: color.text,
    'font-size': 40,
  },
};

class ClassHeader extends React.Component {

  static propTypes = {
    clazz: T.shape({
      header_image_url: T.string,
      times_ord: T.string.isRequired,
      grade: T.number.isRequired,
      ['class']: T.number.isRequired,
      title: T.string.isRequired,
      prizes: T.arrayOf(T.object).isRequired,
    }),
  }

  render() {
    const { sheet, clazz } = this.props;
    const { classes } = sheet;
    const headerImage = clazz.header_image_url || '/static/img/no-icon.svg';
    const classIdJa = `${clazz.times_ord} ${clazz.grade}年${clazz['class']}組`;
    const wrap = (props, children) => (
      <div {...props}>
        {children}
        <div className={classes.titleWrapper}>
          <p className={classes.id}>{classIdJa}</p>
          <p className={classes.title}>{clazz.title}</p>
        </div>
      </div>
    );
    return (
      <ImageLoader className={classes.header}
                   wrapper={wrap}
                   src={headerImage}
                   imgProps={{className: classes.headerImage, width: size.contentsWidth}}
                   preloader={() => <img className={classes.center} src="/static/img/loading.gif"/>}>
        oops!
      </ImageLoader>
    );
  }
}

export default useSheet(ClassHeader, sheet);
