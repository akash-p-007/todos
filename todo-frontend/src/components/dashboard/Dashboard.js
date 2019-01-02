import React, { Component } from 'react';
import axios from 'axios';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos:[]
    };
  }
  componentWillMount(){
    axios
      .get('http://localhost:3000/todos')
      .then( (res) => {
        this.setState({todos: res.data});    
      })
      .catch(function (error) {
      console.log(error);
      });
  }
 
  render() {
    const todoItems = this.state.todos.map( todo => (
      <div key={todo.id}>
        <h4>{todo.title}</h4>
      </div>
    ));
    return (
      <div>
        { todoItems }
      </div>
    )
  }
}
export default Dashboard;