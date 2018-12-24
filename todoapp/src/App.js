import React, { Component } from 'react';
import './App.css';
import Loginscreen from './components/Loginscreen';
import { Provider } from 'react-redux';
import store from './store'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      uploadScreen:[]
    }
  }
  componentWillMount(){
    var loginPage =[];
    loginPage.push(<Loginscreen parentContext={this}/>);
    this.setState({
                  loginPage:loginPage
                    })
  }
  render() {
    return (
      <Provider store = { store } >
        <div className="App">
          {this.state.loginPage}
          {this.state.uploadScreen}
        </div>
      </Provider>  
    );
  }
}
const style = {
  margin: 15,
};
export default App;