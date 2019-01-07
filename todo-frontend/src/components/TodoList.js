
import React, { Component } from "react";
import TodoItems from "./TodoItems";
import axios from 'axios';
import "./TodoList.css";

class TodoList extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      items: []
    };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentWillMount(){
    axios
      .get('http://localhost:3000/todos')
      .then( (res) => {
        for(var i=0;i<res.data.length;i++)
        {
          var item = {
            text: res.data[i].title,
            key: res.data[i].id
          };
          this.setState((prevState) => {
            return { 
              items: prevState.items.concat(item) 
            };
          });
        }
      })
      .catch(function (error) {
      console.log(error);
      });
  }
  
  componentWillReceiveProps(nextProps){
    //update aaray after adding new prop
    console.log(nextProps);
  }

  addItem(e) {

    if (this._inputElement.value !== "") {
      var newItem = {
        title: this._inputElement.value,
        key: Date.now()
    };
    axios
      .post('http://localhost:3000/todos',newItem)
      .then( (res) => {
        // this.setState({todos: res.data});    
        this.setState((prevState) => {
          return { 
            items: prevState.items.concat(newItem) 
          };
        });
      })
      .catch(function (error) {
      console.log(error);
      });    
      this._inputElement.value = "";
    }
     
    
    this._inputElement.value = "";           
    e.preventDefault();
  }

  deleteItem(key) {
    var filteredItems = this.state.items.filter(function (item) {
      return (item.key !== key);
    });
    
    this.setState({
      items: filteredItems
    });
    axios
      .delete(`http://localhost:3000/todos/${key}`,{ data: {id: key}})
      .then( (res) => {
        console.log("deleted"+ res);    
    })
    .catch(function (error) {
      console.log(error);
    });
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