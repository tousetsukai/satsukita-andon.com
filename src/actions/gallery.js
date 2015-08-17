import { SET_FESTIVALS, SET_CLASSES, SET_CLASS_DATA } from '../constants/ActionTypes';
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

export function loadClassesOf(times) {
  return dispatch => {
    client.classes.listOfTimes(times).then(classes => {
      dispatch({
        type: SET_CLASSES,
        classes
      });
    });
  };
}

export function loadClassData(times, grade, clazz) {
  return dispatch => {
    client.classes.getClassData(times, grade, clazz).then(classData => {
      dispatch({
        type: SET_CLASS_DATA,
        classData
      });
    });
  };
}
