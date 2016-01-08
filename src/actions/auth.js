import Cookies from 'js-cookie';

import api from '../api';
import { showError } from './util';

export const me = (token) => (dispatch) => api.getMe(token)
  .then(res => {
    dispatch({ type: 'app:user:set', user: res.data });
    return true;
  })
  .catch(res => showError(res.data.code, 'アクセストークンが正しくありません。', 3000)(dispatch));

export const signin = (login, password) => (dispatch) => api.getToken(login, password)
  .then(res => {
    const token = res.data.token;
    Cookies.set('token', token);
    return me(token)(dispatch);
  }).catch(res => {
    if (res.status === 400) {
      return showError(res.data.code, 'ユーザー名またはパスワードが間違っています。')(dispatch);
    } else {
      return showError(res.data.code, '何かがおかしいです。')(dispatch);
    }
  });
