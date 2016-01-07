import React, { PropTypes as T } from 'react';
import ImageLoader from 'react-imageloader';

import * as classutil from '../util/class';
import f from '../util/f';

class ClassHeader extends React.Component {

  static propTypes = {
    clazz: T.object.isRequired, // empty object or class object
  }

  render() {
    const { clazz } = this.props;
    const headerImage = clazz.header_image_url || '/static/img/no-icon.svg';
    const classNameJa = classutil.classNameJa(clazz);
    const wrap = (props, children) => (
      <div {...props}>
        {children}
        <div className="title-wrapper">
          <p className="id">{classNameJa}</p>
          <div className="title-prize">
            <p className="title">{clazz.title}</p>
            <ul className="prizes">
              {f.map(clazz.prizes, prizes => prizes.map((prize) => (
                 <li key={prize.code}
                     style={{color: `#${prize.color}`, borderColor: `#${prize.color}`}}
                     className="prize">
                   {prize.label}
                 </li>
               )))}
            </ul>
          </div>
        </div>
      </div>
    );
    return (
      <ImageLoader className="class-header"
                   wrapper={wrap}
                   src={headerImage}
                   imgProps={{className: 'header-image'}}
                   preloader={() => <img src="/static/img/loading.gif"/>}>
        画像を読み込めませんでした
      </ImageLoader>
    );
  }
}

export default ClassHeader;
