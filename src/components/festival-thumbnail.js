import React, { PropTypes as T } from 'react';
import ImageLoader from 'react-imageloader';
import classnames from 'classnames';

import useSheet from '../jss';
import { center } from '../jss/util';
import color from '../jss/color';
import size from '../jss/size';

const sheet = {
  center,
  thumbnail: {
    position: 'relative',
    transition: '0.2s linear',
    '&:hover': {
      'box-shadow': '0 0 20px 3px black',
      'z-index': '10',
    },
  },
  times: {
    color: color.text,
    position: 'absolute',
    top: 35,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    'text-align': 'center',
    'font-size': 24,
    'font-weight': 'lighter',
    'text-shadow': '0 0 3px black',
  },
  theme: {
    color: color.text,
    position: 'absolute',
    top: 60,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    'text-align': 'center',
    'font-size': 54,
    'text-shadow': '0 0 7px black',
  },
  roman: {
    color: color.text,
    position: 'absolute',
    top: 130,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    'text-align': 'center',
    'font-size': 24,
    'font-weight': 'lighter',
    'text-shadow': '0 0 3px black',
  },
  imgNormal: {
    transition: '0.2s linear',
    '-webkit-filter': 'blur(2px)',
  },
  imgHover: {
    '-webkit-filter': 'blur(0px)',
  },
};

class FestivalThumbnail extends React.Component {

  static propTypes = {
    festival: T.shape({
      thumbnail_url: T.string,
      times_ord: T.string.isRequired,
      theme: T.string.isRequired,
      theme_roman: T.string.isRequired,
    }),
    sheet: T.shape({
      classes: T.shape({
        thumbnail: T.string,
      }),
    }),
  }

  state = {
    hover: false,
  }

  onMouseEnter = () => {
    this.setState({ hover: true });
  }

  onMouseLeave = () => {
    this.setState({ hover: false });
  }

  render() {
    const { sheet, festival } = this.props;
    const { classes } = sheet;
    const thumbnail = festival.thumbnail_url || '/static/img/no-icon.svg';
    const wrap = (props, children) => (
      <div {...props} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        {children}
        <p className={classes.times}>{festival.times_ord}</p>
        <p className={classes.theme}>{festival.theme}</p>
        <p className={classes.roman}>{festival.theme_roman}</p>
      </div>
    );
    return (
      <ImageLoader className={classes.thumbnail}
                   wrapper={wrap}
                   src={thumbnail}
                   imgProps={{
                     width: size.contentsWidth / 4,
                     height: size.contentsWidth / 4 * (3 / 4),
                     className: classnames({
                       [classes.imgNormal]: true,
                       [classes.imgHover]: this.state.hover,
                     }),
                   }}
                   preloader={() => <img className={classes.center} src="/static/img/loading.gif"/>}>
        oops!
      </ImageLoader>
    );
  }
}

export default useSheet(FestivalThumbnail, sheet);
