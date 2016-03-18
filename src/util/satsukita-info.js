import moment from 'moment';

// festival times of this year
const times = () => {
  const m = moment();
  const basic = m.year() - 1949; // e.g., 60th = 2009 - 1949
  return m.month() < 4 ? basic - 1 : basic;
};

export default {
  firstGradeTimes: times() + 2,
  secondGradeTimes: times() + 1,
  thirdGradeTimes: times(),
};
