import React from 'react';
import "../styles.css";
import "bootstrap/dist/css/bootstrap.css";
import TodoItem from "../components/TodoItem";
import Axios from 'axios';
import { connect } from 'react-redux';
import { 
  incrementTodoCount, 
  decrementTodoCount, 
  changeTodoCount,
  fetchTodoGlobal,
} from '../redux/actions/todo';

class TodoPage extends React.Component {
  state = {
    todoList: [],
    inputTodo: "",
  }

  fetchTodo = async () => {
    Axios.get("http://localhost:2000/todo") //start execute
    .then((response) => {
      console.log(response.data)
      this.setState({ todoList: response.data })
      this.props.changeTodo(response.data.length);
    })
    .catch((err) => {
      alert("404 Not Found");
    });
  };

  deleteTodo = (id) => {
    Axios.delete(`http://localhost:2000/todo/${id}`)
    .then(() => {
      alert("Todo item deleted successfuly!");
      this.props.fetchTodoGlobal();
    })
    .catch((err) => {
      alert("404 Not Found");
    });
  };

  completeTodo = (id) => {
    Axios.patch(`http://localhost:2000/todo/${id}`, {
      isFinished: true
    })
    .then(() => {
      alert("Todo item completed successfuly!");
      this.props.fetchTodoGlobal();
    })
    .catch((err) => {
      alert("404 Not Found");
    });
  };

  renderTodoList = () => {
    return this.props.todoGlobalState.todoList.map((val) => {
      return (
        <TodoItem 
          completeTodoHandler={this.completeTodo} 
          deleteTodoHandler={this.deleteTodo} 
          todoData={val} 
        />
      )
    })
  }

  addTodo = () => {
    Axios.post("http://localhost:2000/todo", {
      activity: this.state.inputTodo,
      isFinished: false,
    })
    .then(() => {
      alert("New todo item added successfuly!");
      this.props.fetchTodoGlobal();
    })
    .catch((err) => {
      alert("404 Not Found");
    })
  }

  inputHandler = (event) => {
    // event.target.value menyimpan value dari input text saat ini
    this.setState({ inputTodo: event.target.value });
  }

  componentDidMount() {
    // this.fetchTodo();
    this.props.fetchTodoGlobal();
  }

  // componentDidUpdate() {
  //   console.log('Component Updated')
  // }

  render () {
    // alert('Component Rendered')
    return (
      <div className="container mt-3">
        <button className="btn btn-info" onClick={this.fetchTodo}>
          Get my todo list ({this.props.todoGlobalState.todoCount})
        </button>
        { this.renderTodoList() }
        <div className="mt-3">
          <input onChange={this.inputHandler} type="text" className="mx-3"/>
          <button onClick={this.addTodo} className="btn btn-primary">
            Add Todo
          </button>
          <button onClick={this.props.incrementTodo} className="btn btn-warning">
            Increment Todo
          </button>
          <button onClick={this.props.decrementTodo} className="btn btn-info">
            Decrement Todo
          </button>
          <button onClick={() => this.props.changeTodo(7)} className="btn btn-dark">
            Change Todo
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // state = {
  //  todo: todo
  // }
  // state.todo.todoCount
  return {
    testingProps: 0,
    todoGlobalState: state.todo,
  }
}

const mapDispatchToProps = {
  incrementTodo: incrementTodoCount,
  decrementTodo: decrementTodoCount,
  changeTodo: changeTodoCount,
  fetchTodoGlobal,
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);
