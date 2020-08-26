import React, { useState, useRef, useEffect } from "react";
import "./Input.css";
import PropTypes from "prop-types";

const Input = ({ onAdd }) => {
  const [value, setValue] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (value === "") return null;
    onAdd(value);
    setValue("");
    return false;
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const inputTodo = useRef(null);

  useEffect(() => {
    inputTodo.current.focus();
  }, []);

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        ref={inputTodo}
        className="new-todo"
        placeholder="What needs to be done?"
        value={value}
        onChange={handleInputChange}
      />
    </form>
  );
};

Input.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default Input;
