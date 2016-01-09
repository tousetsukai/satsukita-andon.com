import React, { PropTypes as T } from 'react';

import ImageLoader from './image-loader';

class FestivalThumbnail extends React.Component {

  static propTypes = {
    festival: T.shape({
      thumbnail_url: T.string,
      times_ord: T.string.isRequired,
      theme: T.string.isRequired,
      theme_roman: T.string.isRequired,
    }),
  }

  render() {
    const { festival } = this.props;
    const thumbnail = festival.thumbnail_url || '/static/img/no-icon.svg';
    const wrap = (props, children) => (
      <div {...props}>
        {children}
        <div className="themes">
          <p className="times">{festival.times_ord}</p>
          <p className="theme">{festival.theme}</p>
          <p className="roman">{festival.theme_roman}</p>
        </div>
      </div>
    );
    return (
      <ImageLoader className="festival-thumbnail"
                   wrapper={wrap}
                   src={thumbnail}
                   imgProps={{ className: 'image' }}
                   cover={true}>
        画像を読み込めませんでした
      </ImageLoader>
    );
  }
}

export default FestivalThumbnail;
