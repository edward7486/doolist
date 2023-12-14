import React from 'react';
import { useContext } from 'react';
import DataContext from '../context/DataContext';
import { TrashIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';

const ListItem = ({ item }) => {
  
  const { todoItems, setTodoItems, handleChecked, handleEditPanel } = useContext(DataContext);

  const handleDelete = (id) => {
    const newList = todoItems.filter((item) => item.id !== id)
    setTodoItems(newList);
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
      <Link 
        to={`/task/${item.id}`}
      >
        <label 
          className="ml-2 align-middle cursor-pointer" 
          htmlFor={ item.id } 
          style={ item.checked ? {textDecoration:"line-through"} : null }
          onClick={(e) => handleEditPanel(true)}
        >
          { item.name }
        </label>
      </Link>
      <TrashIcon 
        className='w-6 h-6 float-right text-slate-500 hidden group-hover:block cursor-pointer hover:text-red-500'
        onClick={(e) => handleDelete(item.id)}
      />
      <span className="tooltiptext hidden">Tooltip text</span>
    </li>
  )
}

export default ListItem