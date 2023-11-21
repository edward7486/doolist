import React from 'react'

const CompletedListItem = ({ item }) => {
  return (
    <li className='px-2 py-2 bg-slate-100'>
      <input 
        type="checkbox"
        id={ item.id } 
        className="w-4 h-4 align-middle checked:bg-green-500"
        checked
        readOnly
      /> 
      <label 
        className="ml-2 align-middle" 
        htmlFor={ item.id } 
        style={{
          textDecoration:"line-through", color:"text-slate-200" 
        }}
      >
        { item.name }
      </label>
    </li>
  )
}

export default CompletedListItem