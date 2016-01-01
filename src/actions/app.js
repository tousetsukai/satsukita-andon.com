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
