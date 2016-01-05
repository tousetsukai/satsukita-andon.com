import _ from 'lodash';

const map = (o, f) => {
  if (_.isUndefined(o)) {
    return o;
  } else {
    return f(o);
  }
};

export default {
  map,
};
