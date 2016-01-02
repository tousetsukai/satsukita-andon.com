import React, { PropTypes as T } from 'react';
import ImageLoader from 'react-imageloader';

import useSheet from '../jss';
import { center } from '../jss/util';
import size from '../jss/size';

const sheet = {
  ...center,
  thumbnail: {
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

  render() {
    const { sheet, festival } = this.props;
    const { classes } = sheet;
    const thumbnail = festival.thumbnail_url || '/static/img/no-icon.svg';
    return (
      <ImageLoader className={classes.thumbnail}
                   src={thumbnail}
                   imgProps={{
                     width: size.contentsWidth / 4,
                     height: size.contentsWidth / 4 * (3 / 4),
                   }}
                   preloader={() => <img className={classes.center} src="/static/img/loading.gif"/>}>
        oops!
      </ImageLoader>
    );
  }
}

export default useSheet(FestivalThumbnail, sheet);
