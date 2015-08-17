import { SET_FESTIVALS, SET_CLASSES, SET_CLASS_DATA } from '../constants/ActionTypes';
import client from '../api-mock';

function isEmpty(any) {
  if (any) {
    if (typeof any === 'array') {
      return any.length === 0;
    } else if (typeof any === 'object') {
      return Object.keys(any).length === 0;
    }
  } else {
    return true;
  }
}

export function loadFestivals(sortType) {
  return (dispatch, getState) => {
    if (isEmpty(getState().gallery.festivals)) {
      return client.festivals.list(sortType).then(festivals => {
        dispatch({
          type: SET_FESTIVALS,
          festivals
        });
      });
    }
  };
}

export function loadClassesOf(times) {
  return (dispatch, getState) => {
    if (isEmpty(getState().gallery.classes)) {
      return client.classes.listOfTimes(times).then(classes => {
        dispatch({
          type: SET_CLASSES,
          classes
        });
      });
    }
  };
}

export function loadClassData(times, grade, clazz) {
  return (dispatch, getState) => {
    if (isEmpty(getState().gallery.classData)) {
      return client.classes.getClassData(times, grade, clazz).then(classData => {
        dispatch({
          type: SET_CLASS_DATA,
          classData
        });
      });
    }
  };
}
