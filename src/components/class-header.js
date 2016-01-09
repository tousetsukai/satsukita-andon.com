import React, { PropTypes as T } from 'react';

import * as classutil from '../util/class';
import f from '../util/f';
import ImageLoader from './image-loader';

class ClassHeader extends React.Component {

  static propTypes = {
    clazz: T.object.isRequired, // empty object or class object
  };

  render() {
    const { clazz } = this.props;
    const headerImage = clazz.header_image_url || '/static/img/transparent.svg';
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
                     style={{color: `#${prize.color}`}}
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
                   imgProps={{className: 'header-image'}}>
        画像を読み込めませんでした
      </ImageLoader>
    );
  }
}

export default ClassHeader;
