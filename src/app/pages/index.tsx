import Next from 'next';
import React from 'react';
import { TopLogo } from '../components/atom/Logo';

const Index: Next.NextSFC<{}> = () => (
  <React.Fragment>
    Hello, World
    <TopLogo />
  </React.Fragment>
);

export default Index;
