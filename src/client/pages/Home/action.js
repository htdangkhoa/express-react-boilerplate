import axios from 'axios';

export const FETCH_USER = '@@FETCH_USER';
export const fetchUserAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      'https://randomuser.me/api/?inc=name&results=10',
    );

    dispatch({
      type: FETCH_USER,
      payload: [...data.results],
    });
  } catch (error) {
    console.error(error);

    dispatch({
      type: FETCH_USER,
      payload: [],
    });
  }
};
