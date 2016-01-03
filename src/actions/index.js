import Cookies from 'js-cookie';

import api from '../api';

// loading: (Dispatch -> Promise[?]) => Dispatch => Promise[?]
export const loading = (action) => (dispatch) => {
  dispatch({ type: 'app:loading:show' });
  return action(dispatch).then(res => {
    dispatch({ type: 'app:loading:hide' });
    return res;
  });
};

/**
 * All actions have type: ? -> (dispatch: Action -> Action) -> Promise[Boolean]
 */

export const showError = (code, message, millis) => (dispatch) => {
  return new Promise(resolve => {
    dispatch({ type: 'app:error:show', error: { code, message } });
    resolve(false);
    if (millis) {
      setTimeout(() => {
        dispatch({ type: 'app:error:hide' });
      }, millis);
    }
  });
};

export const getFixedContent = (type) => (dispatch) => api.getFixedContent(type)
  .then(res => {
    dispatch({ type: `contents:${type}:set`, content: res.data });
    return true;
  })
  .catch(res => showError(res.data.code, '内容を取得できませんでした。')(dispatch));

export const getFestivals = (dispatch) => api.getFestivals()
  .then(res => {
    dispatch({ type: 'festivals:set', festivals: res.data.items });
    return true;
  })
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

export const clearClass = (dispatch) => {
  dispatch({ type: 'class:clear' });
  return Promise.resolve(true);
};

export const getReviews = (classId) => (dispatch) => api.getReviews(classId)
  .then(res => dispatch({ type: 'class:reviews:set', reviews: res.data.items }))
  .catch(res => {
    return showError(res.data.code, '講評を取得できませんでした。')(dispatch);
  });

export const clearReviews = (dispatch) => {
  dispatch({ type: 'class:reviews:clear' });
  return Promise.resolve(true);
};

export const getTimesClasses = (times) => (dispatch) => api.getClasses({ times, limit: 50 })
  .then(res => {
    dispatch({ type: 'times:set', classes: res.data.items });
    return true;
  })
  .catch(res => {
    if (res.status === 404) {
      return showError(res.data.code, 'その回は見つかりませんでした。')(dispatch);
    } else {
      return showError(res.data.code, '情報を取得できませんでした。')(dispatch);
    }
  });

export const clearTimesClasses = (dispatch) => {
  dispatch({ type: 'times:clear' });
  return Promise.resolve(true);
};

export const getArticles = (params) => (dispatch) => api.getArticles(params)
  .then(res => {
    dispatch({ type: 'howto:articles:set', articles: res.data.items });
    return true;
  }).catch(res => showError(res.data.code, '情報を取得できませんでした。')(dispatch));

export const getArticle = (id) => (dispatch) => api.getArticle(id)
  .then(res => {
    dispatch({ type: 'howto:article:set', article: res.data });
    return true;
  }).catch(res => showError(res.data.code, '情報を取得できませんでした。')(dispatch));

export const clearArticle = (dispatch) => {
  dispatch({ type: 'howto:article:clear' });
  return Promise.resolve(true);
};

export const me = (token) => (dispatch) => api.getUser(token)
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
