import React, { useState } from "react";
import PropTypes from "prop-types";
import Footer from "./Footer";
import TodoList from "./TodoList";
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "./TodoFilters";

const MainSection = ({
  todos,
  deleteTodo,
  editTodo,
  toggleTodo,
  toggleAllTodo,
  clearCompleted
}) => {
  const [visibilityFilter, setFilter] = useState(SHOW_ALL);

  const todosCount = todos.length;
  const completedCount = todos.filter(({ completed }) => completed).length;
  let visibleTodos;
  switch (visibilityFilter) {
    case SHOW_ALL:
      visibleTodos = todos;
      break;
    case SHOW_COMPLETED:
      visibleTodos = todos.filter(t => t.completed);
      break;
    case SHOW_ACTIVE:
      visibleTodos = todos.filter(t => !t.completed);
      break;
    default:
      throw new Error("Unknown filter: " + visibilityFilter);
  }

  return (
    <section className="main">
      {!!todosCount && (
        <span>
          <input
            className="toggle-all"
            type="checkbox"
            checked={completedCount === todosCount}
            readOnly
          />
          <label onClick={toggleAllTodo} />
        </span>
      )}
      <TodoList
        todos={visibleTodos}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        toggleTodo={toggleTodo}
      />
      {!!todosCount && (
        <Footer
          visibilityFilter={visibilityFilter}
          setFilter={setFilter}
          completedCount={completedCount}
          activeCount={todosCount - completedCount}
          clearCompleted={clearCompleted}
        />
      )}
    </section>
  );
};

MainSection.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  toggleAllTodo: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired
};

export default MainSection;
