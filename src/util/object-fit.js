import cn from 'classnames';

const handleLoad = (that, prop) => (ev) => {
  const image = ev.target;
  that.setState({ [prop]: image.naturalHeight > image.naturalWidth });
};

const className = (that, prop) => {
  const horizontal = that.state[prop];
  if (typeof horizontal === 'undefined') {
    return '';
  } else {
    return cn({
      'object-fit-horizontal': horizontal,
      'object-fit-vertical': !horizontal,
    });
  }
};

export default {
  handleLoad,
  className,
};
