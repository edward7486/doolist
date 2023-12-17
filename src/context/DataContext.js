import React from 'react';
import { createContext, useState, useEffect } from 'react';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  
  const [ todo, setTodo ] = useState('');
  const [ todoItems, setTodoItems ] = useState([]);
  const [ editProjectIsOpen, setEditProjectIsOpen ] = useState(false);
  const [ editPanelOpen, setEditPanelOpen ] = useState(JSON.parse(localStorage.getItem('editPanelState')));
  const [ projectSettings, setProjectSettings ] = useState(
    {
      projectTitle: 'My Doolist',
      showCompletedList: false
    }
  );

  useEffect(() => {

    // Todos from local storage
    const todos = localStorage.getItem('todos');
    if ( todos ) { setTodoItems(JSON.parse(todos));}

    // Project settings from local storage
    const fetchTitle = localStorage.getItem('projectTitle');
    const fetchCompletedState = localStorage.getItem('completedState');
    if (fetchTitle && fetchCompletedState) {
      setProjectSettings({projectTitle: fetchTitle, showCompletedList: JSON.parse(fetchCompletedState)});
    }
    
  }, []);  

  const handleEditPanel = (boolean) => {
    setEditPanelOpen(boolean);
  }

  const handleChecked = (id) => {

    // Reflecting the checked state in the list
    const checkedList = todoItems.map((item) => item.id === id ? { ...item, checked: !item.checked} : item);
    setTodoItems(checkedList);
    localStorage.setItem('todos', JSON.stringify(checkedList));

  }  

  const uniqueId = () => {
    return Math.floor((Date.now() * Math.random()) / 1000);
  }
  
  return (
    <DataContext.Provider value={{
      todoItems, setTodoItems, 
      projectSettings, setProjectSettings,
      todo, setTodo,
      editProjectIsOpen, setEditProjectIsOpen,
      handleChecked,
      handleEditPanel,
      editPanelOpen, setEditPanelOpen,
      uniqueId
    }}>
     {children} 
    </DataContext.Provider>
  )
}

export default DataContext