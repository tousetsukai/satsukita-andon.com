import React from 'react';
import Helmet from 'react-helmet';

export default function helmetTemplate(
  title = '行灯職人への道',
  description = '行灯職人への道は札幌北高校の行灯行列の記録および支援を行うWebサイトです。'
) {
  return (<Helmet
    title={title}
    meta={[
      { name: 'description', content: description }
    ]}
  />);
}
