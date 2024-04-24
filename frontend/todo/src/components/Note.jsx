import React, { useState, useEffect } from "react";
import axios from "axios";

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(props.title);
  const [updatedBody, setUpdatedBody] = useState(props.content);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Load tasks from localStorage on component mount
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    // Save tasks to localStorage when tasks change
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleEdit() {
    setIsEditing(true);
  }

  function handleUpdate() {
    const updatedTasks = tasks.map(task => {
      if (task.id === props.id) {
        return { ...task, title: updatedTitle, content: updatedBody };
      }
      return task;
    });
    setTasks(updatedTasks);
    setIsEditing(false);
  }

  function handleComplete() {
    const updatedTasks = tasks.map(task => {
      if (task.id === props.id) {
        return { ...task, completionStatus: "Completed" };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function handleDelete() {
    const filteredTasks = tasks.filter(task => task.id !== props.id);
    setTasks(filteredTasks);
  }

  return (
    <div className="note">
      <div className="header">
        <h1>{props.title}</h1>
        <button onClick={handleDelete} className="delete-button">
          Delete
        </button>
      </div>
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <textarea
            value={updatedBody}
            onChange={(e) => setUpdatedBody(e.target.value)}
          ></textarea>
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <p>{props.content}</p>
          <div className="metadata">
            <p>Completion Status: {props.completionStatus || "Pending"}</p>
            <p>Created on: {new Date(props.createdAt).toLocaleString()}</p>
          </div>
          <div className="button-container">
            <button onClick={handleComplete} className="complete-button">
              Complete
            </button>
            <button onClick={handleEdit} className="edit-button">
              Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Note;
