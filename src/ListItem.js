import React from 'react'

const ListItem = ({ item, handleChecked }) => {
  return (
    <li className='px-2 py-2'>
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
    </li>
  )
}

export default ListItem