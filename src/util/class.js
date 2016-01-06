export const classNameWithoutTimes = (clazz) => {
  const g = clazz.grade;
  const c = clazz['class'] >= 1 ? clazz['class'] : '?';
  return `${g}-${c}`;
};

export const classNameWithoutTimesJa = (clazz) => {
  const g = clazz.grade;
  const c = clazz['class'] >= 1 ? clazz['class'] : '?';
  return `${g}年${c}組`;
};

export const className = (clazz) => {
  return clazz.times_ord + classNameWithoutTimes(clazz);
};

export const classNameJa = (clazz) => {
  return clazz.times_ord + classNameWithoutTimesJa(clazz);
};

export const classIdWithoutTimes = (clazz) => {
  return clazz.grade + '-' + clazz['class'];
};

export const classId = (clazz) => {
  const t = clazz.times_ord;
  return t + classIdWithoutTimes(clazz);
};

export const classIdWithSlash = (clazz) => {
  const t = clazz.times_ord;
  return t + '/' + classIdWithoutTimes(clazz);
};
