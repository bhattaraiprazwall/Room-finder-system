export const getNearbyRooms = (lat, lng, distance) => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:5000/room/nearby?lat=${lat}&lng=${lng}&distance=${distance}`);
    
    dispatch({
      type: GET_ROOMS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ROOM_ERROR,
      payload: { msg: err.response?.data?.error || 'Server Error', status: err.response?.status }
    });
  }
};