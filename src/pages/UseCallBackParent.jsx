import React, { useState, useCallback } from 'react';
import TaskList from './UseCallBackСhild';

const TaskManager = () => {
  const [tasks, setTasks] = useState(['Task 1', 'Task 2']);
  const [counter, setCounter] = useState(0);
  const incrementCount = () => {
    setCounter(counter + 1);
  };
  console.log('incrementCount', counter);

  /* Функция для добавления новой задачи. Без useCallback функция будет пересоздаваться при каждом рендере родительского компонента, что может вызвать ненужные повторные рендеры дочернего компонента. Использование useCallback предотвращает это.*/
  const addTask = useCallback(() => {
    setTasks((prevTasks) => [...prevTasks, `Task ${prevTasks.length + 1}`]);
  }, [setTasks]);

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskList tasks={tasks} addTask={addTask} />
      <button onClick={incrementCount}>Click</button>
    </div>
  );
};

export default TaskManager;
