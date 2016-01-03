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
    'box-shadow': '0 0 50px 10px black inset',
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
    // ref: http://deerest.co/2015/10/22/css3-img-center-trimming/
    position: 'relative',
    top: '50%',
    left: '50%',
    width: '100%',
    height: 'auto',
    transform: 'translate(-50%, -50%)',
    'z-index': '-1',
  },
  id: {
    color: color.text,
    'font-size': 20,
  },
  titlePrize: {
    display: 'flex',
    'justify-content': 'space-between',
  },
  title: {
    color: color.text,
    'font-size': 40,
  },
  prizes: {
    'font-size': 40,
    '& li': {
      'list-style-type': 'none',
    },
  },
  prize: {
    border: '2px solid',
    'border-radius': '10px',
    'margin-top': '-6px',
    padding: '4px 18px',
    'margin-right': '20px',
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
          <div className={classes.titlePrize}>
            <p className={classes.title}>{clazz.title}</p>
            <ul className={classes.prizes}>
              {clazz.prizes.map((prize) => (
                 <li key={prize.code}>
                   <p style={{color: `#${prize.color}`, borderColor: `#${prize.color}`}}
                      className={classes.prize}>
                     {prize.label}
                   </p>
                 </li>
               ))}
            </ul>
          </div>
        </div>
      </div>
    );
    return (
      <ImageLoader className={classes.header}
                   wrapper={wrap}
                   src={headerImage}
                   imgProps={{className: classes.headerImage}}
                   preloader={() => <img className={classes.center} src="/static/img/loading.gif"/>}>
        oops!
      </ImageLoader>
    );
  }
}

export default useSheet(ClassHeader, sheet);
