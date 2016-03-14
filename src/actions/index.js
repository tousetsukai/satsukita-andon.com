import api from '../api';
import { showError } from './util';

export * from './util';
export * from './class';
export * from './auth';

export const getRandomImages = (n) => (dispatch) => api.getRandomImages(n)
  .then(res => {
    dispatch({ type: 'home:jumbotron-images:set', images: res.data });
    return true;
  })
  .catch(res => showError(res.data.code, '内容を取得できませんでした。')(dispatch));

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

export const getTimesClasses = (times) => (dispatch) => api.getClasses({ times, limit: 50 })
  .then(res => {
    dispatch({ type: 'times:set', classes: res.data.items, classesOf: times });
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

export const getUser = (login) => (dispatch) => api.getUser(login)
  .then(res => {
    dispatch({ type: 'users:user:set', user: res.data });
    return true;
  }).catch(res => showError(res.data.code)(dispatch));

export const clearUser = (dispatch) => {
  dispatch({ type: 'users:user:clear' });
  return Promise.resolve(true);
};
