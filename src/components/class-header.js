import React, { PropTypes as T } from 'react';
import ImageLoader from 'react-imageloader';

class ClassHeader extends React.Component {

  static propTypes = {
    clazz: T.shape({
      header_image_url: T.string,
      times_ord: T.string.isRequired,
      grade: T.number.isRequired,
      ['class']: T.number.isRequired,
      title: T.string.isRequired,
      prizes: T.arrayOf(T.object).isRequired,
    }),
  }

  render() {
    const { clazz } = this.props;
    const headerImage = clazz.header_image_url || '/static/img/no-icon.svg';
    const classIdJa = `${clazz.times_ord} ${clazz.grade}年${clazz['class']}組`;
    const wrap = (props, children) => (
      <div {...props}>
        {children}
        <div className="title-wrapper">
          <p className="id">{classIdJa}</p>
          <div className="title-prize">
            <p className="title">{clazz.title}</p>
            <ul className="prizes">
              {clazz.prizes.map((prize) => (
                 <li key={prize.code}
                     style={{color: `#${prize.color}`, borderColor: `#${prize.color}`}}
                     className="prize">
                   {prize.label}
                 </li>
               ))}
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
        oops!
      </ImageLoader>
    );
  }
}

export default ClassHeader;
