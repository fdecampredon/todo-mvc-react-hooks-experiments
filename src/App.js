import React, { useState, useCallback } from "react";
import Header from "./Header";
import MainSection from "./MainSection";

const useTodos = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = text => {
    setTodos([
      ...todos,
      {
        id: todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        completed: false,
        text
      }
    ]);
  };

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, text) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text } : todo)));
  };

  const toggleTodo = id => {
    setTodos(
      todos.map(
        todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleAllTodo = () => {
    const areAllMarked = todos.every(todo => todo.completed);
    setTodos(
      todos.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }))
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => todo.completed === false));
  };

  return [
    todos,
    {
      addTodo,
      deleteTodo,
      editTodo,
      toggleTodo,
      toggleAllTodo,
      clearCompleted
    }
  ];
};

const App = () => {
  const [
    todos,
    { addTodo, deleteTodo, editTodo, toggleTodo, toggleAllTodo, clearCompleted }
  ] = useTodos();

  return (
    <div>
      <Header addTodo={addTodo} />
      <MainSection
        todos={todos}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        toggleTodo={toggleTodo}
        toggleAllTodo={toggleAllTodo}
        clearCompleted={clearCompleted}
      />
    </div>
  );
};

export default App;
