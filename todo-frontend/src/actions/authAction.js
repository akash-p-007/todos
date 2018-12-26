import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode'; 
import {GET_ERRORS, SET_CURRENT_USER} from './types';

//Register User
export const registerUser = (userData, history) => dispatch => {
  
  axios
    .post('http://localhost:3000/signup',userData)
    .then(res => history.push('/login'))
    .catch(err => 
      dispatch({
        type:GET_ERRORS,
        payload:err.response.data
      })
    );
};

//Login user
export const loginUser = userData => dispatch => {
  axios
    .post('http://localhost:3000/auth/login', userData)
    .then(res => {
      const token = res.data.auth_token;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token); 
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch({
      type:GET_ERRORS,
      payload:err.response.data
    })
    );
};

//set logged in user
export const setCurrentUser = (decoded) => {
  return{
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

//Logging user out
export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
}
