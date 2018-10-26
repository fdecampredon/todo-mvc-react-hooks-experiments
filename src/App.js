import React from "react";
import Header from "./Header";
import MainSection from "./MainSection";
import useReturningState from "./useReturningState";

const initialState = [];

const addTodo = (text, todos) => [
  ...todos,
  {
    id: todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
    completed: false,
    text
  }
];

const deleteTodo = (id, todos) => todos.filter(todo => todo.id !== id);

const editTodo = (id, text, todos) =>
  todos.map(todo => (todo.id === id ? { ...todo, text } : todo));

const toggleTodo = (id, todos) =>
  todos.map(
    todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)
  );

const toggleAllTodo = todos => {
  const areAllMarked = todos.every(todo => todo.completed);
  return todos.map(todo => ({
    ...todo,
    completed: !areAllMarked
  }));
};

const clearCompleted = todos => todos.filter(todo => todo.completed === false);

const actions = {
  addTodo,
  deleteTodo,
  editTodo,
  toggleTodo,
  toggleAllTodo,
  clearCompleted
};

const App = () => {
  const [
    todos,
    { addTodo, deleteTodo, editTodo, toggleTodo, toggleAllTodo, clearCompleted }
  ] = useReturningState(initialState, actions);

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
