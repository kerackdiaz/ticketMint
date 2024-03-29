import React, { useState, useRef } from 'react';




const TodoApp = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Payroll', completed: true },
    { id: 2, text: 'Create new events', completed: false },
    { id: 3, text: 'Contrac', completed: false },
    { id: 4, text: 'Call Jhon', completed: false },
    { id: 5, text: 'Shedule', completed: false }
  ]);
  const newTaskRef = useRef(null);

  const handleAddTask = () => {
    if (newTaskRef.current.value.trim() !== '') {
      setTasks([
        ...tasks,
        { id: Date.now(), text: newTaskRef.current.value, completed: false }
      ]);
      newTaskRef.current.value = '';
      newTaskRef.current.focus();
    }
  };

  const handleCheckboxChange = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  return (
    <div className="latptop:w-[65%] relative latptop:left-[15%] tablet:left-[25%] tablet:w-1/2 w-[80%] h-[80%] top-32 right-8 py-6 px-6 rounded-xl border border-gray-200  mt-10 flex flex-wrap gap-10">

    <div className="w-full h-[80%]  shadow-lg rounded-md latptop:w-[55%] latptop:ml-44">
      <div className="bg-white p-3  ">
        <div className="text-center">
          <h1 className="text-3xl font-bold">ToDo App</h1>
          <div className="mt-4 flex latptop:pl-16 ">
            <input
              ref={newTaskRef}
              className="latptop:w-[400px] w-[200px] tablet:w-[300px] border-b-2 border-gray-500 text-black"
              type="text"
              placeholder="Enter your task here"
            />
            <button
              className="ml-2 border-2 border-pink p-2 text-pink hover:text-white hover:bg-green-500 rounded-lg flex"
              onClick={handleAddTask}
            >
              <svg className="h-6 w-6" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx="12" cy="12" r="9" />
                <line x1="9" y1="12" x2="15" y2="12" />
                <line x1="12" y1="9" x2="12" y2="15" />
              </svg>
              <span>Add</span>
            </button>
          </div>
        </div>
        <div className="mt-8">
          <ul>
            {tasks.map(task => (
              <li key={task.id} className={`p-2 rounded-lg ${task.completed ? 'line-through text-gray-400' : ''}`}>
                <div className="flex align-middle flex-row justify-between ">
                  <div className="p-2">
                    <input
                      type="checkbox"
                      className="h-6 w-6"
                      checked={task.completed}
                      onChange={() => handleCheckboxChange(task.id)}
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-lg ">{task.text}</p>
                  </div>
                  
                </div>
                <hr className="mt-2" />
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8">
          <button
            className="border-2 border-red-500 p-2 text-red-500 rounded-lg"
            onClick={handleClearCompleted}
          >
            Clear Completed Task
          </button>
         
        </div>
      </div>
    </div>
    </div>
  );
};

export default TodoApp;
