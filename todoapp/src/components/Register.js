import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Login from './Login';
import axios from 'axios';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      email:'',
      password:'',
      password_confirmation:''
    }
  }

  handleClick(event){
    var apiBaseUrl = 'http://localhost:3000';
    console.log("values",this.state.first_name,this.state.email,this.state.password, this.state.password_confirmation);
    //To be done:check for empty values before hitting submit
    var self = this;
    if(this.state.first_name.length>0 && this.state.password_confirmation.length>0 && this.state.email.length>0 && this.state.password.length>0){
    
      var payload={
      name: this.state.first_name,
      email:this.state.email,
      password:this.state.password,
      password_confirmation: this.state.password_confirmation
      }
      axios.post(apiBaseUrl + '/signup', payload)
      .then(function (response) {
      console.log(response);
      if(response.status === 201){
        var loginscreen=[];
        loginscreen.push(<Login parentContext={this} appContext={self.props.appContext} />);
        var loginmessage = "Not Registered yet.Go to registration";
        self.props.parentContext.setState({loginscreen:loginscreen,
        loginmessage:loginmessage,
        buttonLabel:"Register",
        isLogin:true
        });
        }
      else{
        console.log("some error ocurred",response.data.code);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
 else{
   alert("Input field value is missing");
 }
}
  

  render(){
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Register"
           />
           <TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {(event,newValue) => this.setState({first_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Confirm Password"
             floatingLabelText="Confirm Password"
             onChange = {(event,newValue) => this.setState({password_confirmation:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Register;