interface ClassNameMap {
  [className: string]: string;
}

const styleHelper = (style: ClassNameMap) => (
  classNames: Array<string | undefined>,
  nativeClassNames?: Array<string | undefined>,
) =>
  classNames
    .map((name) => name && style[name])
    .concat(nativeClassNames)
    .filter(Boolean)
    .join(' ');

export default styleHelper;
