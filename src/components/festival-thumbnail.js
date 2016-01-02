import React, { PropTypes as T } from 'react';

import useSheet from '../jss';

const sheet = {
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
      <img className={classes.thumbnail}
           width={1024 / 4}
           src={thumbnail}/>
    );
  }
}

export default useSheet(FestivalThumbnail, sheet);
