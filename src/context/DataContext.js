import React from 'react';
import { createContext, useState, useEffect } from 'react';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  
  const [ todo, setTodo ] = useState('');
  const [ todoItems, setTodoItems ] = useState([]);
  const [ editProjectIsOpen, setEditProjectIsOpen ] = useState(false);
  const [ editPanelOpen, setEditPanelOpen ] = useState(JSON.parse(localStorage.getItem('editPanelState')));
  const [ status, setStatus ] = useState('');
  const [ projectSettings, setProjectSettings ] = useState(
    {
      projectTitle: 'My Doolist',
      showCompletedList: false
    }
  );

  useEffect( function fetchFromLocalStorage () {

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

    const theItem = todoItems.find((item) => item.id === id);
    if (theItem.checked === false) {
      const checkedList = todoItems.map((item) => item.id === id ? { ...item, checked: true, status: 'completed'} : item);
      setTodoItems(checkedList);
      localStorage.setItem('todos', JSON.stringify(checkedList));
    } else if (theItem.checked === true) {
      const checkedList = todoItems.map((item) => item.id === id ? { ...item, checked: false, status: 'open'} : item);
      setTodoItems(checkedList);
      localStorage.setItem('todos', JSON.stringify(checkedList));
    }

  }  

  const handleStatusChange = (e, id) => {
    e.preventDefault();
    setStatus(e.target.value);
    if (e.target.value === 'completed') {
      const newStatusList = todoItems.map((item) => item.id === id ? { ...item, status: e.target.value, checked: true } : item);
      setTodoItems(newStatusList);
      localStorage.setItem('todos', JSON.stringify(newStatusList));  
    } else if (e.target.value === 'open' || 'inProgress'){
      const newStatusList = todoItems.map((item) => item.id === id ? { ...item, status: e.target.value, checked: false } : item);
      setTodoItems(newStatusList);
      localStorage.setItem('todos', JSON.stringify(newStatusList));
    }
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
      handleStatusChange,
      editPanelOpen, setEditPanelOpen,
      uniqueId,
      status, setStatus
    }}>
     {children} 
    </DataContext.Provider>
  )
}

export default DataContext