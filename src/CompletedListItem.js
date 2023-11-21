import React from 'react'

const CompletedListItem = ({ item }) => {
  return (
    <li className='px-2 py-2 bg-slate-100'>
      <input 
        type="checkbox"
        id={ item.id } 
        className="w-4 h-4 align-middle accent-slate-200"
        checked
        disabled
      /> 
      <label 
        className="ml-2 align-middle text-slate-500" 
        htmlFor={ item.id } 
      >
        { item.name }
      </label>
    </li>
  )
}

export default CompletedListItem