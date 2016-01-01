import Cookies from 'js-cookie';

import api from '../api';

export const showError = (code, message, millis) => (dispatch) => {
  return new Promise(resolve => {
    dispatch({ type: 'app:error:show', error: { code, message } });
    if (millis) {
      setTimeout(() => {
        dispatch({ type: 'app:error:hide' });
        resolve();
      }, millis);
    } else {
      resolve();
    }
  });
};

export const getTopNews = (dispatch) => api.getTopNews()
  .then(res => dispatch({ type: 'top-news:set', topNews: res.data }))
  .catch(res => showError(res.data.code, 'トップニュースを取得できませんでした。')(dispatch));

export const getFestivals = (dispatch) => api.getFestivals()
  .then(res => dispatch({ type: 'festivals:set', festivals: res.data.items }))
  .catch(res => showError(res.data.code, '情報を取得できませんでした。', 3000)(dispatch));

export const getClass = (classId) => (dispatch) => api.getClass(classId)
  .then(res => dispatch({ type: 'class:set', clazz: res.data }))
  .catch(res => {
    if (res.status === 404) {
      return showError(res.data.code, 'クラスが見つかりませんでした。')(dispatch);
    } else {
      return showError(res.data.code, '情報を取得できませんでした。')(dispatch);
    }
  });

export const getTimesClasses = (times) => (dispatch) => api.getClasses({ times, limit: 50 })
  .then(res => dispatch({ type: 'times:set', classes: res.data.items }))
  .catch(res => {
    if (res.status === 404) {
      return showError(res.data.code, 'その回は見つかりませんでした。')(dispatch);
    } else {
      return showError(res.data.code, '情報を取得できませんでした。')(dispatch);
    }
  });

export const me = (token) => (dispatch) => api.getUser(token)
  .then(res => dispatch({ type: 'app:user:set', user: res.data }))
  .catch(res => showError(res.data.code, 'アクセストークンが正しくありません。', 3000)(dispatch));

export const signin = (login, password) => (dispatch) => api.getToken(login, password)
  .then(res => {
    const token = res.data.token;
    Cookies.set('token', token);
    return token;
  }).then(token => {
    return me(token)(dispatch);
  }).catch(res => {
    if (res.status === 400) {
      return showError(res.data.code, 'ユーザー名またはパスワードが間違っています。')(dispatch);
    } else {
      return showError(res.data.code, '何かがおかしいです。')(dispatch);
    }
  });
