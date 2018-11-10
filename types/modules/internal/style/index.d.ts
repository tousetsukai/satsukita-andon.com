declare const path: string;

declare module '*/asset/styles/common.css' {
  export = path;
}

declare module '*.css' {
  export = classMap;
  const classMap: {
    [key: string]: string;
  };
}
