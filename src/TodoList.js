import React from "react";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, editTodo, deleteTodo, toggleTodo }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        editTodo={editTodo}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired
};

export default TodoList;
