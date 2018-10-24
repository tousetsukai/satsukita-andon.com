declare module '@zeit/next-css' {
  import { NextConfig } from 'next';

  export = NextCSS;

  function NextCSS(config: NextConfig): NextConfig;
}
