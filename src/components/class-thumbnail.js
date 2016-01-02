import React, { PropTypes as T } from 'react';
import { Link } from 'react-router';

import useSheet from '../jss';

const sheet = {
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
        <img className={classes.thumbnail}
             width={1024 / 4}
             src={thumbnail}/>
        <p>{`${gradeClass} ${clazz.title}`}</p>
      </Link>
    );
  }
}

export default useSheet(ClassThumbnail, sheet);
