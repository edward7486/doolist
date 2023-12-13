import React from 'react'
import { useContext } from 'react'
import DataContext from '../context/DataContext'
import { Link } from 'react-router-dom'

const CompletedListItem = ({ item }) => {
  
  const { completed, setCompleted, todoItems, setTodoItems, handleCompletedCheck } = useContext(DataContext);

  return (
    <li className='px-2 py-2 bg-slate-100'>
      <input 
        type="checkbox"
        id={ item.id } 
        className="w-4 h-4 align-middle accent-slate-500 cursor-pointer"
        onChange={(e) => handleCompletedCheck(item.id)}
        checked={ item.checked ? true : false }
      />
      <Link to={`/task/${item.id}`}>
        <label 
          className="ml-2 align-middle text-slate-500 cursor-pointer line-through" 
          htmlFor={ item.id } 
        >
          { item.name }
        </label>
      </Link>
    </li>
  )
}

export default CompletedListItem