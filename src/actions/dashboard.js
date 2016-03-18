import api from '../api';
import { showError } from './util';
import F from '../util/f';

export const getArticles = (params) => (dispatch) => api.getArticles(params)
  .then(res => {
    dispatch({ type: 'dashboard:articles:append', items: res.data });
    return true;
  }).catch(res => showError(F.map(res.data, d => d.code), '情報を取得できませんでした。')(dispatch));
