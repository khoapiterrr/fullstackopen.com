const initialState = {
  message: '',
};

const notificationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_NOTIFICATION':
      return { message: payload };
    case 'CLEAR_NOTIFICATION':
      return { message: '' };
    default:
      return state;
  }
};
export const setNotification = (mes) => ({
  type: 'SET_NOTIFICATION',
  payload: mes,
});
export const clearNotification = () => ({
  type: 'CLEAR_NOTIFICATION',
});
export default notificationReducer;
