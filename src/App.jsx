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
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Todo List</h1>
      <form onSubmit={handleSubmit} className="mb-6 flex justify-center ">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a task"
          required
          className="border p-2 rounded  mx-auto mb-4 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button type="submit" className=" bg-blue-500 text-white px-4 py-0 h-12  rounded shadow-md hover:bg-blue-600 transition duration-300">
          {editMode ? 'Edit' : 'Add'} Task
        </button>
      </form>
      <ul className="list-none p-0">
        {tasks.map(task => (
          <li key={task.id} className="flex items-center justify-between p-4 mb-2 border rounded shadow-sm hover:shadow-lg transition duration-300">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(toggleTask(task.id))}
              className="mr-4 cursor-pointer"
            />
            <span
              className={`flex-grow cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}
              onClick={() => dispatch(toggleTask(task.id))}
            >
              {task.text}
            </span>
            <button onClick={() => handleEdit(task)} className="bg-yellow-500 text-white px-3 py-1 rounded shadow-md hover:bg-yellow-600 transition duration-300 mr-2">
              Edit
            </button>
            <button onClick={() => dispatch(deleteTask(task.id))} className="bg-red-500 text-white px-3 py-1 rounded shadow-md hover:bg-red-600 transition duration-300">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
