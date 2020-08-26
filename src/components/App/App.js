import React, { useState } from "react";
import "./App.css";
import Input from "../Input/Input";
import TodoList from "../TodoList/TodoList";

let originalId = 0;

function App() {
  const createTodoItem = (title) => {
    const date = Date.now();
    originalId += 1;
    return {
      title,
      id: originalId,
      isCompleted: false,
      date,
    };
  };

  const [todos, setTodos] = useState([]);

  const [filtrationStatus, setFilterCondition] = useState({
    all: true,
    active: false,
    completed: false,
  });

  const handleClearCompletedButtonClick = () => {
    const unCompletedTodos = todos.filter((item) => !item.isCompleted);
    setTodos(unCompletedTodos);
  };

  const addItem = (title) => {
    const newItem = createTodoItem(title);
    setTodos([...todos, newItem]);
  };

  const deleteItem = (id) => {
    const copy = [...todos];
    const idx = copy.findIndex((item) => item.id === id);
    setTodos([...copy.slice(0, idx), ...copy.slice(idx + 1)]);
  };

  const handleFilterAllButtonClick = () => {
    setFilterCondition({
      all: true,
      active: false,
      completed: false,
    });
  };

  const handleFilterActiveButtonClick = () => {
    setFilterCondition({
      all: false,
      active: true,
      completed: false,
    });
  };

  const handleFilterCompletedButtonClick = () => {
    setFilterCondition({
      all: false,
      active: false,
      completed: true,
    });
  };

  const changeItemTitle = (id, newTitle) => {
    const copy = [...todos];
    const idx = copy.findIndex((item) => item.id === id);
    const oldItem = copy[idx];
    const updatedItem = { ...oldItem, title: newTitle };
    setTodos([...copy.slice(0, idx), updatedItem, ...copy.slice(idx + 1)]);
  };

  const handleChangeCompleteStatus = (id) => {
    const copy = [...todos];
    const idx = copy.findIndex((item) => item.id === id);
    const oldItem = copy[idx];
    const newItem = { ...oldItem, isCompleted: !oldItem.isCompleted };
    setTodos([...copy.slice(0, idx), newItem, ...copy.slice(idx + 1)]);
  };

  const activeTodos = [...todos].filter((item) => !item.isCompleted).length;

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <Input onAdd={addItem} />
      </header>
      <main className="main">
        <TodoList
          todos={todos}
          onDelete={deleteItem}
          onChangeTitle={changeItemTitle}
          filtrationStatus={filtrationStatus}
          onToggleComplete={handleChangeCompleteStatus}
        />
      </main>
      <footer className="footer">
        <span>{activeTodos} items left</span>
        <ul className="filters">
          <li>
            <button type="button" onClick={handleFilterAllButtonClick}>
              All
            </button>
          </li>
          <li>
            <button type="button" onClick={handleFilterActiveButtonClick}>
              Active
            </button>
          </li>
          <li>
            <button type="button" onClick={handleFilterCompletedButtonClick}>
              Completed
            </button>
          </li>
        </ul>
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearCompletedButtonClick}
        >
          Clear completed
        </button>
      </footer>
    </div>
  );
}

export default App;
