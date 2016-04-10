import api from '../api';
import { showError } from './util';
import F from '../util/f';

export * from './util';
export * from './class';
export * from './auth';
export * from './dashboard';

export const rendered = (dispatch) => {
  dispatch({ type: 'app:rendered' });
  return Promise.resolve(true);
};

export const getFixedContent = (type) => (dispatch) => api.getFixedContent(type)
  .then(res => {
    dispatch({ type: `contents:${type}:set`, content: res.data });
    return true;
  })
  .catch(res => showError(F.map(res.data, d => d.code), '内容を取得できませんでした。')(dispatch));

export const getFestivals = (dispatch) => api.getFestivals()
  .then(res => {
    dispatch({ type: 'festivals:set', festivals: res.data.items });
    return true;
  })
  .catch(res => showError(F.map(res.data, d => d.code), '情報を取得できませんでした。', 3000)(dispatch));

export const getTimesClasses = (times) => (dispatch) => api.getClasses({ times, limit: 50 })
  .then(res => {
    dispatch({ type: 'times:set', classes: res.data.items, classesOf: times });
    return true;
  })
  .catch(res => {
    if (res.status === 404) {
      return showError(F.map(res.data, d => d.code), 'その回は見つかりませんでした。')(dispatch);
    } else {
      return showError(F.map(res.data, d => d.code), '情報を取得できませんでした。')(dispatch);
    }
  });

export const clearTimesClasses = (dispatch) => {
  dispatch({ type: 'times:clear' });
  return Promise.resolve(true);
};

// howto

export const getArticles = (params) => (dispatch) => api.getArticles(params)
  .then(res => {
    dispatch({ type: 'howto:articles:append', items: res.data });
    return true;
  }).catch(res => showError(F.map(res.data, d => d.code), '情報を取得できませんでした。')(dispatch));

export const clearArticles = (dispatch) => {
  dispatch({ type: 'howto:articles:clear' });
  return Promise.resolve(true);
};

export const getArticle = (id) => (dispatch) => api.getArticle(id)
  .then(res => {
    dispatch({ type: 'howto:article:set', article: res.data });
    return true;
  }).catch(res => showError(F.map(res.data, d => d.code), '情報を取得できませんでした。')(dispatch));

export const clearArticle = (dispatch) => {
  dispatch({ type: 'howto:article:clear' });
  return Promise.resolve(true);
};

export const getResources = (params) => (dispatch) => api.getResources(params)
  .then(res => {
    dispatch({ type: 'howto:resources:append', items: res.data });
    return true;
  }).catch(res => showError(F.map(res.data, d => d.code), '情報を取得できませんでした。')(dispatch));

export const clearResources = (dispatch) => {
  dispatch({ type: 'howto:resources:clear' });
  return Promise.resolve(true);
};

export const getResource = (id) => (dispatch) => api.getResource(id)
  .then(res => {
    dispatch({ type: 'howto:resource:set', resource: res.data });
    return true;
  }).catch(res => showError(F.map(res.data, d => d.code), '情報を取得できませんでした。')(dispatch));

export const clearResource = (dispatch) => {
  dispatch({ type: 'howto:resource:clear' });
  return Promise.resolve(true);
};

export const getUser = (login) => (dispatch) => api.getUser(login)
  .then(res => {
    dispatch({ type: 'users:user:set', user: res.data });
    return true;
  }).catch(res => showError(F.map(res.data, d => d.code))(dispatch));

export const clearUser = (dispatch) => {
  dispatch({ type: 'users:user:clear' });
  return Promise.resolve(true);
};
