import React, { PropTypes as T } from 'react';
import ImageLoader from 'react-imageloader';
import classnames from 'classnames';

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
    const { festival } = this.props;
    const thumbnail = festival.thumbnail_url || '/static/img/no-icon.svg';
    const wrap = (props, children) => (
      <div {...props} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        {children}
        <p className="times">{festival.times_ord}</p>
        <p className="theme">{festival.theme}</p>
        <p className="roman">{festival.theme_roman}</p>
      </div>
    );
    return (
      <ImageLoader className="festival-thumbnail"
                   wrapper={wrap}
                   src={thumbnail}
                   imgProps={{
                     className: classnames({
                       'image-normal': true,
                       'image-hover': this.state.hover,
                     }),
                   }}
                   preloader={() => <img src="/static/img/loading.gif"/>}>
        画像を読み込めませんでした
      </ImageLoader>
    );
  }
}

export default FestivalThumbnail;
