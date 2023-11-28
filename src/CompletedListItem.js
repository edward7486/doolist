import React from 'react'
import { useContext } from 'react'
import DataContext from './context/DataContext'

const CompletedListItem = ({ item }) => {
  
  const { completed, setCompleted, todoItems, setTodoItems } = useContext(DataContext);

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
    <li className='px-2 py-2 bg-slate-100'>
      <input 
        type="checkbox"
        id={ item.id } 
        className="w-4 h-4 align-middle accent-slate-200 cursor-pointer"
        onChange={(e) => handleCompletedCheck(item.id)}
        checked={ item.checked ? true : false }
      /> 
      <label 
        className="ml-2 align-middle text-slate-500 cursor-pointer" 
        htmlFor={ item.id } 
      >
        { item.name }
      </label>
    </li>
  )
}

export default CompletedListItem