import _ from 'lodash';

export const classNameWithoutTimes = (clazz) => {
  if (_.isEmpty(clazz)) { return undefined; }
  const g = clazz.grade;
  const c = clazz['class'] >= 1 ? clazz['class'] : '?';
  return `${g}-${c}`;
};

export const classNameWithoutTimesJa = (clazz) => {
  if (_.isEmpty(clazz)) { return undefined; }
  const g = clazz.grade;
  const c = clazz['class'] >= 1 ? clazz['class'] : '?';
  return `${g}年${c}組`;
};

export const className = (clazz) => {
  if (_.isEmpty(clazz)) { return undefined; }
  return clazz.times_ord + classNameWithoutTimes(clazz);
};

export const classNameJa = (clazz) => {
  if (_.isEmpty(clazz)) { return undefined; }
  return clazz.times_ord + classNameWithoutTimesJa(clazz);
};

export const classIdWithoutTimes = (clazz) => {
  if (_.isEmpty(clazz)) { return undefined; }
  return clazz.grade + '-' + clazz['class'];
};

export const classId = (clazz) => {
  if (_.isEmpty(clazz)) { return undefined; }
  const t = clazz.times_ord;
  return t + classIdWithoutTimes(clazz);
};

export const classIdWithSlash = (clazz) => {
  if (_.isEmpty(clazz)) { return undefined; }
  const t = clazz.times_ord;
  return t + '/' + classIdWithoutTimes(clazz);
};
