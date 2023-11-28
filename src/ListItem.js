import React from 'react';
import { useContext } from 'react';
import DataContext from './context/DataContext';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'

const ListItem = ({ item }) => {
  
  const { todoItems, setTodoItems, completed, setCompleted } = useContext(DataContext);

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

  return (
    <li className='px-2 py-2 group hover:bg-slate-50'>
      <input 
        type="checkbox"
        id={ item.id } 
        className="w-4 h-4 align-middle cursor-pointer"
        onChange={(e)=> handleChecked(item.id)}
        checked = { item.checked ? true : false }
      /> 
      <label 
        className="ml-2 align-middle cursor-pointer" 
        htmlFor={ item.id } 
        style={ item.checked ? {textDecoration:"line-through"} : null }
      >
        { item.name }
      </label>
      <EllipsisHorizontalIcon className='w-6 h-6 float-right text-slate-500 hidden group-hover:block'/>
      <span className="tooltiptext hidden">Tooltip text</span>
    </li>
  )
}

export default ListItem