import React from 'react'
import { useContext } from 'react';
import DataContext from '../context/DataContext';
import DateObject from 'react-date-object';

const Form = () => {

  const { todo, setTodo, todoItems, setTodoItems, projectSettings, uniqueId } = useContext(DataContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const todoObject = {
      id: uniqueId(),
      name: todo,
      checked: false,
      status: 'open',
      created: new DateObject().format('MM/DD/YYYY, hh:mm a')
    }
    const newList = [...todoItems, todoObject];
    setTodoItems(newList);
    setTodo('');
    localStorage.setItem('todos', JSON.stringify(newList));
  }  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          autoFocus
          type="text" 
          name="add todo"
          placeholder={`Add item to ${projectSettings.projectTitle}`}
          className="border-solid border-2 px-2 py-2 mb-2 rounded-md w-full"
          value={todo}
          onChange={(e) => { setTodo(e.target.value) } }
        />
      </form>
    </>
  )
}

export default Form