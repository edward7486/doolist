import React from 'react';
import { createContext, useState, useEffect } from 'react';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  
  const [ todo, setTodo ] = useState('');
  const [ todoItems, setTodoItems ] = useState([]);
  const [ completed, setCompleted ] = useState([]);
  const [ editProjectIsOpen, setEditProjectIsOpen ] = useState(false);
  const [ projectSettings, setProjectSettings ] = useState(
    {
      projectTitle: 'My Doolist',
      showCompletedList: false
    }
  );

  useEffect(() => {
    // Fetch todos from local storage
    const todos = localStorage.getItem('todos');
    if ( todos ) {
      setTodoItems(JSON.parse(todos));
    }

    // Fetch project settings from local storage
    const fetchTitle = localStorage.getItem('projectTitle');
    const fetchCompletedState = localStorage.getItem('completedState');
    
    if (fetchTitle && fetchCompletedState) {
      setProjectSettings({projectTitle: fetchTitle, showCompletedList: JSON.parse(fetchCompletedState)});
    }

    // Fetch completed items list
    const fetchCompleted = localStorage.getItem('completedItems');
    if (fetchCompleted) {
      setCompleted(JSON.parse(fetchCompleted));
    }
    
  }, []);  
  
  return (
    <DataContext.Provider value={{
      todoItems, setTodoItems, 
      completed, setCompleted,
      projectSettings, setProjectSettings,
      todo, setTodo,
      editProjectIsOpen, setEditProjectIsOpen
    }}>
     {children} 
    </DataContext.Provider>
  )
}

export default DataContext