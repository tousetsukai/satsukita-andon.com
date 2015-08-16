import { SET_FESTIVALS } from '../constants/ActionTypes';
import client from '../api-mock';

export function loadFestivals(sortType) {
  return dispatch => {
    client.festivals.list(sortType).then(festivals => {
      dispatch({
        type: SET_FESTIVALS,
        festivals
      });
    });
  };
}
