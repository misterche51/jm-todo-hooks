import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { formattedDate } from "../../workers/time";
import "./TodoItem.css";
import Timer from "../Timer/Timer";

const TodoItem = ({
  title,
  id,
  date,
  isCompleted,
  onToggleComplete,
  onDelete,
  onChangeTitle,
  filtrationStatus,
}) => {
  const KEYCODES = {
    ENTER: 13,
    ESCAPE: 27,
  };

  const INTERVAL = 1000;

  const [isItemCompleted, setItemCompletedStatus] = useState(isCompleted);
  const [isItemEditing, setItemEditingStatus] = useState(false);
  const [timeDistance, setTimeDistance] = useState(formattedDate(date));

  const inputChangeTitle = useRef(null);

  useLayoutEffect(() => {
    if (isItemEditing) {
      inputChangeTitle.current.focus();
    }
  }, [isItemEditing]);

  useEffect(() => {
    const refreshDateInterval = setInterval(() => {
      setTimeDistance(formattedDate(date));
    }, INTERVAL);
    return () => clearInterval(refreshDateInterval);
  });

  const handleCheckboxChange = (e) => {
    const { id: idx } = e.target;
    onToggleComplete(Number(idx));
    setItemCompletedStatus(!isItemCompleted);
  };

  const handleEditButtonClick = () => {
    setItemEditingStatus(true);
  };

  const handleEditInputSubmit = (e) => {
    if (e.keyCode === KEYCODES.ESCAPE) {
      setItemEditingStatus(false);
    }
    if (e.keyCode === KEYCODES.ENTER) {
      const { id: idx, value } = e.target;
      if (value.trim() === "") {
        onDelete(Number(idx));
      }
      onChangeTitle(Number(idx), value);
      setItemEditingStatus(false);
    }
  };
  const { active, completed } = filtrationStatus;

  const completeStatus = isItemCompleted ? "completed" : "";
  const editStatus = isItemEditing ? "editing" : "";
  const hiddenStatus =
    (isItemCompleted && active) || (!isItemCompleted && completed)
      ? "hidden"
      : "";

  const changeTitleInput = isItemEditing && (
    <input
      ref={inputChangeTitle}
      type="text"
      id={id}
      className="edit"
      defaultValue={title}
      onKeyDown={(e) => handleEditInputSubmit(e)}
    />
  );

  return (
    <li className={`${completeStatus} ${editStatus} ${hiddenStatus}`}>
      <div className="view">
        <input
          id={id}
          type="checkbox"
          className="toggle"
          checked={isItemCompleted}
          onChange={(evt) => handleCheckboxChange(evt)}
        />
        <label>
          <span className="description">{title}</span>
          <span className="created">{timeDistance}</span>
          <Timer isItemCompleted={isItemCompleted} />
        </label>
        <button
          type="button"
          aria-label="Edit item"
          onClick={handleEditButtonClick}
          className="icon icon-edit"
        />
        <button
          type="button"
          id={id}
          onClick={(e) => onDelete(Number(e.target.id))}
          aria-label="Delete item"
          className="icon icon-destroy"
        />
      </div>
      {changeTitleInput}
    </li>
  );
};

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  date: PropTypes.number.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onChangeTitle: PropTypes.func.isRequired,
  filtrationStatus: PropTypes.objectOf(
    PropTypes.bool,
    PropTypes.bool,
    PropTypes.bool
  ).isRequired,
};

export default TodoItem;
