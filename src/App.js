import React from "react";
import { Subject, merge } from "rxjs";
import { map, scan } from "rxjs/operators";
import Header from "./Header";
import MainSection from "./MainSection";
import useReactiveState from "./useReactiveState";

const todosIntent = initialState => {
  const addTodo$ = new Subject();
  const deleteTodo$ = new Subject();
  const editTodo$ = new Subject();
  const toggleTodo$ = new Subject();
  const toggleAllTodo$ = new Subject();
  const clearCompleted$ = new Subject();

  const todos$ = merge(
    addTodo$.pipe(
      map(text => todos => [
        ...todos,
        {
          id: todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text
        }
      ])
    ),
    deleteTodo$.pipe(map(id => todos => todos.filter(todo => todo.id !== id))),
    editTodo$.pipe(
      map(({ id, text }) => todos =>
        todos.map(todo => (todo.id === id ? { ...todo, text } : todo))
      )
    ),
    toggleTodo$.pipe(
      map(id => todos =>
        todos.map(
          todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      )
    ),
    toggleAllTodo$.pipe(
      map(() => todos => {
        const areAllMarked = todos.every(todo => todo.completed);
        return todos.map(todo => ({
          ...todo,
          completed: !areAllMarked
        }));
      })
    ),
    clearCompleted$.pipe(
      map(() => todos => todos.filter(todo => todo.completed === false))
    )
  ).pipe(scan((todos, operation) => operation(todos), initialState));

  return {
    state$: todos$,
    events$: {
      addTodo: addTodo$,
      deleteTodo: deleteTodo$,
      editTodo: editTodo$,
      toggleTodo: toggleTodo$,
      toggleAllTodo: toggleAllTodo$,
      clearCompleted: clearCompleted$
    }
  };
};

const App = () => {
  const [
    todos,
    { addTodo, deleteTodo, editTodo, toggleTodo, toggleAllTodo, clearCompleted }
  ] = useReactiveState(todosIntent, []);

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
