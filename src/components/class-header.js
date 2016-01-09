import React, { PropTypes as T } from 'react';

import * as classutil from '../util/class';
import f from '../util/f';
import ImageLoader from './image-loader';

class ClassHeader extends React.Component {

  static propTypes = {
    clazz: T.object.isRequired, // empty object or class object
  };

  prizeIcon = (prize) => {
    if (prize.index >= 100) { // grand
      return 'first';
    } else if (prize.index >= 40) { // gold, silver, bronze
      return 'second';
    } else {
      return 'third';
    }
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
                   <svg className="prize-icon" style={{color: '#' + prize.color}}>
                     <use xlinkHref={'/static/img/prizes.svg#' + this.prizeIcon(prize)}/>
                   </svg>
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
