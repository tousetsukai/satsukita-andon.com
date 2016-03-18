import _ from 'lodash';

const map = (o, f) => {
  if (_.isUndefined(o) || _.isNull(o)) {
    return undefined;
  } else {
    return f(o);
  }
};

export default {
  map,
};
