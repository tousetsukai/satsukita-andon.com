import React, { PropTypes as T } from 'react';

import useSheet from '../jss';

const sheet = {
  thumbnail: {
  },
};

class FestivalThumbnail extends React.Component {

  static propTypes = {
    festival: T.shape({
      thumbnail_url: T.string, // .isRequired,
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
    return (
      <img className={classes.thumbnail}
           width={1024 / 4}
           src={`https://satsukita-andon.com/files/grands/${festival.times_ord}.jpg`}/>
    );
  }
}

export default useSheet(FestivalThumbnail, sheet);
