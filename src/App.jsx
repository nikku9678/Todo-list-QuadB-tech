// src/App.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, editTask, toggleTask } from './redux/actions';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      dispatch(editTask(editId, task));
      setEditMode(false);
      setEditId(null);
    } else {
      const newTask = { id: Date.now(), text: task, completed: false };
      dispatch(addTask(newTask));
    }
    setTask('');
  };

  const handleEdit = (task) => {
    setTask(task.text);
    setEditMode(true);
    setEditId(task.id);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a task"
          required
        />
        <button type="submit">{editMode ? 'Edit' : 'Add'} Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(toggleTask(task.id))}
            />
            <span
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            >
              {task.text}
            </span>
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
