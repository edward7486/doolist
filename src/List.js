import React from 'react'
import ListItem from './ListItem'

const List = ({ todoItems, setTodoItems, handleSubmit, todo, setTodo, handleChecked }) => {

  return (
    <>
      <ul className="divide-y">
        { todoItems.length ? todoItems.map((item) => (
          <ListItem item={item} key={item.id} handleChecked={handleChecked}/>
        )) : <p>You're all caught up!</p>}
      </ul>
    </>
  )
}

export default List