import React, { PropTypes as T } from 'react';
import Underlying from 'react-imageloader';
import classnames from 'classnames';

import fit from '../util/object-fit';
import Loader from './loader';

export default class ImageLoader extends React.Component {
  static propTypes = {
    cover: T.bool,
    className: T.string,
    wrapper: T.func,
    src: T.string.isRequired,
    imgProps: T.object,
  }

  state = {
    fit: undefined,
  }

  render() {
    const p = this.props;
    const onLoad = p.cover ? fit.handleLoad(this, 'fit') : undefined;
    const imgProps = {
      ...p.imgProps,
      className: p.cover ? classnames(p.imgProps.className, fit.className(this, 'fit')) : p.imgProps.className,
    };
    return (
      <Underlying className={p.className}
                  wrapper={p.wrapper}
                  src={p.src}
                  imgProps={imgProps}
                  onLoad={onLoad}
                  preloader={() => <Loader/>}>
        {this.props.children}
      </Underlying>
    );
  }
}
