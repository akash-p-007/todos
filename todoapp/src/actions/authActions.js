import axios from 'axios';
import { GET_ERRORS } from './types';
var apiBaseUrl = 'http://localhost:3000';

//Register User
export const registerUser = userData => dispatch => {
  axios
    .post(apiBaseUrl + '/signup')
    .then(function (response) {
    console.log(response);
    if(response.status === 201){
      // var loginscreen=[];
      // loginscreen.push(<Login parentContext={this} appContext={self.props.appContext} />);
      // var loginmessage = "Not Registered yet.Go to registration";
      // self.props.parentContext.setState({loginscreen:loginscreen,
      // loginmessage:loginmessage,
      // buttonLabel:"Register",
      // isLogin:true
      // });
      console.log("success");
      }
    else{
      console.log("some error ocurred",response.data.code);
    }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
      );
};

//Login User

export const loginUser = userData => dispatch => {};