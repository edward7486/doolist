import React from 'react'
import ListItem from './ListItem'

const List = ({ todoItems, setTodoItems, handleSubmit, todo, setTodo, handleChecked }) => {

  return (
    <>
      <ul className="divide-y">
        { todoItems.length ? todoItems.map((item) => (
          <ListItem 
            item={item} 
            key={item.id} 
            handleChecked={handleChecked}
          />
        )) : 
        <div className="p-24 flex flex-col justify-center items-center ">
          <p>Your todo list is empty.</p>
          <p className="text-sm text-slate-600">Add to do items to track progress</p>
        </div>}
      </ul>
    </>
  )
}

export default List