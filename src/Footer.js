import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "./TodoFilters";

const FILTER_TITLES = {
  [SHOW_ALL]: "All",
  [SHOW_ACTIVE]: "Active",
  [SHOW_COMPLETED]: "Completed"
};

const Footer = ({
  visibilityFilter,
  activeCount,
  completedCount,
  setFilter,
  clearCompleted
}) => {
  const itemWord = activeCount === 1 ? "item" : "items";
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount || "No"}</strong> {itemWord} left
      </span>
      <ul className="filters">
        {Object.keys(FILTER_TITLES).map(filter => (
          <li key={filter}>
            {/* eslint-disable jsx-a11y/anchor-is-valid */}
            <a
              className={classnames({ selected: filter === visibilityFilter })}
              style={{ cursor: "pointer" }}
              onClick={() => setFilter(filter)}
            >
              {FILTER_TITLES[filter]}
            </a>
          </li>
        ))}
      </ul>
      {!!completedCount && (
        <button className="clear-completed" onClick={() => clearCompleted()}>
          Clear completed
        </button>
      )}
    </footer>
  );
};

Footer.propTypes = {
  visibilityFilter: PropTypes.string.isRequired,
  completedCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired
};

export default Footer;
