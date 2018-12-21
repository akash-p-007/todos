import React, { Component } from 'react';
import TodoList from './TodoList';
class UploadScreen extends Component {
  
  render() {
    return (
      <div className="App">
        <h1>ToDos are:</h1>
        <TodoList />  
      </div>
    );
  }
}
export default UploadScreen;