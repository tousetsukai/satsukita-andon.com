import * as next from 'next';
declare module 'next' {
  interface ServerOptions {
    isServer?: boolean;
  }
}
