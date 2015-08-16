import React from 'react';
import Helmet from 'react-helmet';

export function head(options) {
  const defaultOptions = {
    title: '',
    description: '行灯職人への道は札幌北高校の行灯行列の記録および支援を行うWebサイトです。'
  };
  options = Object.assign(defaultOptions, options);

  return (<Helmet
    title={(options.title === '') ? '行灯職人への道' : `${options.title} - 行灯職人への道}` }
    meta={[
      { name: 'description', content: options.description }
    ]}
  />);
}
