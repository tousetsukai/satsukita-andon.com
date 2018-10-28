import React from 'react';
import logo from '../../../asset/images/logo.png';
import styleHelper from '../../../util/styleHelper';
import style from './IndexLogo.css';

const s = styleHelper(style);

const IndexLogo: React.SFC = () => (
  <div className={s(['container'])}>
    <img src={logo} alt="行灯職人への道" className={s(['logo'])} />
  </div>
);

export default IndexLogo;
