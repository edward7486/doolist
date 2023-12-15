import React from 'react'
import ListItem from './ListItem'
import { useContext } from 'react'
import DataContext from '../context/DataContext'

const List = () => {

  const { todoItems } = useContext(DataContext);
  const undone = todoItems
    .filter(item => item.checked === false);


  return (
    <>
      <ul className="divide-y">
        { undone.length ? undone.map((item) => (
          <ListItem 
            item={item} 
            key={item.id} 
          />
        )) : 
        <div className="p-16 flex flex-col justify-center items-center ">
          <p>Your todo list is empty.</p>
          <p className="text-sm text-slate-600">Add to do items to track progress</p>
        </div>}
      </ul>
    </>
  )
}

export default List