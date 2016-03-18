import Cookies from 'js-cookie';

import api from '../api';
import { showError } from './util';
import F from '../util/f';

export const me = (token) => (dispatch) => api.getMe(token)
  .then(res => {
    dispatch({ type: 'app:user:set', user: res.data });
    return true;
  })
  .catch(res => showError(F.map(res.data, d => d.code), 'アクセストークンが正しくありません。', 3000)(dispatch));

export const signin = (login, password) => (dispatch) => api.getToken(login, password)
  .then(res => {
    const token = res.data.token;
    Cookies.set('token', token);
    return me(token)(dispatch);
  }).catch(res => {
    if (res.status === 400) {
      return showError(F.map(res.data, d => d.code), 'ユーザー名またはパスワードが間違っています。')(dispatch);
    } else {
      return showError(F.map(res.data, d => d.code), '何かがおかしいです。')(dispatch);
    }
  });

export const signup = (login, password, name, times) => (dispatch) => api.postUser(login, password, name, times)
  .then(res => {
    const token = res.data.token;
    Cookies.set('token', token);
    dispatch({ type: 'app:user:set', user: res.data.user });
    return true;
  }).catch(res => {
    return showError(F.map(res.data, d => d.code), '登録できませんでした')(dispatch);
  });

export const setIcon = (url) => (dispatch) => {
  dispatch({ type: 'app:icon:set', url: url });
};

export const updateMe = (params) => (dispatch) => api.putMe(params)
  .then(res => {
    dispatch({ type: 'app:user:set', user: res.data });
    return true;
  })
  .catch(res => showError(F.map(res.data, d => d.code), '変更に失敗しました', 3000)(dispatch));
