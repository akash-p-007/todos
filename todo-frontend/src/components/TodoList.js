import React, { Component } from "react";
import TodoItems from "./TodoItems";
import axios from 'axios';
import "./TodoList.css";

class TodoList extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      items: this.props.todos
    };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  addItem(e) {
    if (this._inputElement.value !== "") {
      var newItem = {
        title: this._inputElement.value,
        key: Date.now()
      };
   
      // this.setState((prevState) => {
      //   return { 
      //     items: prevState.items.concat(newItem) 
      //   };
      // });
      axios
        .post('http://localhost:3000/todos',newItem)
        .then( (res) => {
          this.setState({todos: res.data});    
        })
        .catch(function (error) {
        console.log(error);
        });
      // console.log(this.state.items[0].title);
      this._inputElement.value = "";
    }        
    e.preventDefault();
  }

  deleteItem(key) {
    var filteredItems = this.state.items.filter(function (item) {
      return (item.key !== key);
    });
   
    this.setState({
      items: filteredItems
    });
    // axios.delete('http://localhost:3000/todos',filteredItems)
    // .then( (res) => {
    //   console.log("deleted"+ res);    
    // })
    // .catch(function (error) {
    // console.log(error);
    // });
  }

  render() {
    return (
      <div className="todoListMain">
      <div className="header">
        <form onSubmit={this.addItem}>
          <input ref={(a) => this._inputElement = a} 
                  placeholder="enter task">
          </input>
          <button type="submit">add</button>
        </form>
      </div>
      <TodoItems entries={this.state.items}
                 delete={this.deleteItem}  />
    </div>
    );
  }
}
 
export default TodoList;