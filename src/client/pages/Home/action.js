import axios from 'axios';
import { apiActionGenerator } from 'utils';

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

export const FETCH_API_ACTION = '@@FETCH_API_ACTION';
export const fetchApiAction = () => async (dispatch) =>
  dispatch(apiActionGenerator({ label: FETCH_API_ACTION }));
