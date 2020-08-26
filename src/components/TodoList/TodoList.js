import React from "react";
import "./TodoList.css";
import PropTypes from "prop-types";
import TodoItem from "../TodoItem/TodoItem";

const TodoList = ({
  todos,
  filtrationStatus,
  onDelete,
  onChangeTitle,
  onToggleComplete,
}) => {
  const elements = todos.map((item) => {
    return (
      <TodoItem
        key={item.id}
        id={item.id}
        title={item.title}
        date={item.date}
        onChangeTitle={onChangeTitle}
        isCompleted={item.isCompleted}
        onToggleComplete={onToggleComplete}
        onDelete={onDelete}
        filtrationStatus={filtrationStatus}
      />
    );
  });
  return <ul className="todo-list">{elements}</ul>;
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onChangeTitle: PropTypes.func.isRequired,
  filtrationStatus: PropTypes.objectOf(
    PropTypes.bool,
    PropTypes.bool,
    PropTypes.bool
  ).isRequired,
};

export default TodoList;
