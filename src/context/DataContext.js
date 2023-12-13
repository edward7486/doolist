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

  const handleChecked = (id) => {

    // Reflecting the checked state in the list
    const checkedList = todoItems.map((item) => item.id === id ? { ...item, checked: !item.checked} : item);
    setTodoItems(checkedList);

    // Adding a delay so the move and check can be seen by the user
    setTimeout(() => {
      // Updating the completed list
      const itemToRemove = checkedList.filter(item => item.id === id);
      const newCompleted = [...completed, itemToRemove[0]];
      setCompleted(newCompleted);
      localStorage.setItem('completedItems', JSON.stringify(newCompleted));

      // Updating list to remove the checked item
      const newList = todoItems.filter((item) => item.id !== id );
      setTodoItems(newList);

      // Local storage call to store the new todo list
      localStorage.setItem('todos', JSON.stringify(newList));
    }, 500)
  }  

  const handleCompletedCheck = (id) => {
    
    // Editing the completed list to make the item checked: false
    const newCompletedCheckedList = completed.map((item) => item.id === id ? {...item, checked: !item.checked} : item )
    setCompleted(newCompletedCheckedList)

    const itemToRemove = newCompletedCheckedList.filter(item => item.id === id);

    // Adding the removed item to the undone todos
    const newToDos = [...todoItems, itemToRemove[0]];
    setTodoItems(newToDos);
    localStorage.setItem('todos', JSON.stringify(newToDos));

    // Updating the completed list to remove the item
    const newList = newCompletedCheckedList.filter(item => item.id !== id);
    setCompleted(newList);
    localStorage.setItem('completedItems', JSON.stringify(newList));

  }
  
  return (
    <DataContext.Provider value={{
      todoItems, setTodoItems, 
      completed, setCompleted,
      projectSettings, setProjectSettings,
      todo, setTodo,
      editProjectIsOpen, setEditProjectIsOpen,
      handleChecked, handleCompletedCheck
    }}>
     {children} 
    </DataContext.Provider>
  )
}

export default DataContext