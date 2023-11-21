import React from 'react'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'

const ListItem = ({ item, handleChecked }) => {
  return (
    <li className='px-2 py-2 group hover:bg-slate-50'>
      <input 
        type="checkbox"
        id={ item.id } 
        className="w-4 h-4 align-middle"
        onChange={(e)=> handleChecked(item.id)}
        checked = {item.checked ? true : false}
      /> 
      <label 
        className="ml-2 align-middle" 
        htmlFor={ item.id } 
        style={ item.checked ? {textDecoration:"line-through"} : null }
      >
        { item.name }
      </label>
      <EllipsisHorizontalIcon className='w-6 h-6 float-right text-slate-500 hidden group-hover:block'/>
    </li>
  )
}

export default ListItem