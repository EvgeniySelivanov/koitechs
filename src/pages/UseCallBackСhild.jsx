import React from 'react';

const TaskList = React.memo(({ tasks, addTask }) => {
  console.log('Rendering TaskList');

  return (
      <div>
          <h3>Task List</h3>
          <ul>
              {tasks.map((task, index) => (
                  <li key={index}>{task}</li>
              ))}
          </ul>
          <button onClick={addTask}>Add Task</button>
      </div>
  );
});

export default TaskList;
