import Next from 'next';
import React from 'react';
import { IndexLogo } from '../components/atom/Logo';

const Index: Next.NextSFC<{}> = () => (
  <React.Fragment>
    Hello, World
    <IndexLogo />
  </React.Fragment>
);

export default Index;
