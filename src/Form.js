import React from 'react'
import { useContext } from 'react';
import DataContext from './context/DataContext';

const Form = () => {

  const { todo, setTodo, todoItems, setTodoItems } = useContext(DataContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const todoObject = {
      id: uniqueId(),
      name: todo,
      checked: false
    }
    const newList = [...todoItems, todoObject];
    setTodoItems(newList);
    setTodo('');
    localStorage.setItem('todos', JSON.stringify(newList));
  }  

  const uniqueId = () => {
    return Math.floor((Date.now() * Math.random()) / 1000);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          autoFocus
          type="text" 
          placeholder="Add to do item"
          className="border-solid border-2 px-2 py-2 mb-2 rounded-md w-full"
          value={todo}
          onChange={(e) => { setTodo(e.target.value) } }
        />
      </form>
    </>
  )
}

export default Form