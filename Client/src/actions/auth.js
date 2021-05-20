import axios from "axios";
import { SOCIAL_ID, GET_SOCIAL_ID} from './constants';
export const register = async (user) =>
  await axios.post(`${process.env.REACT_APP_API}/register`, user);

export const login = async (user) =>
  await axios.post(`${process.env.REACT_APP_API}/login`, user);

  export function storeSocialId(id) {
    console.log('action...', id)
    return (dispatch) => {
        dispatch({
            type: 'SOCIAL_ID',
            payload: id
        })
    }
}

export function getSocialId(){
    return dispatch => {
        dispatch ({
            type: 'GET_SOCIAL_ID'
        })
    }
}