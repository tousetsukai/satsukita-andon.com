interface ClassNameMap {
  [className: string]: string;
}

const styleHelper = (style: ClassNameMap) => (
  classNames: Array<string | undefined | null | false>,
  nativeClassNames?: Array<string | undefined | null | false>,
) =>
  classNames
    .map((name) => name && style[name])
    .concat(nativeClassNames)
    .filter(Boolean)
    .join(' ');

export default styleHelper;
