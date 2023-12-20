import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import DataContext from './context/DataContext'

const DeleteModal = () => {

  const { todoItems, setTodoItems } = useContext(DataContext);

  let { id } = useParams();
  let navigate = useNavigate();
  let todo = todoItems.find((t) => (t.id.toString() === id)) ||   localStorage.getItem('todo');
  localStorage.setItem('todo', JSON.stringify(todo));
  
  function onDismiss() {
    navigate(-1);
  };

  const handleDelete = (id) => {
    const newList = todoItems.filter((item) => item.id !== id)
    setTodoItems(newList);
    localStorage.setItem('todos', JSON.stringify(newList));
    navigate(-1);
  }

  return (
    <div className='modal'>
      <div className='modal-content rounded-md max-w-sm divide-y bg-white'>
      
        <div className="modal-body mt-2">
          <div className='p-4'>
            <p>Are you sure you want to delete task <span className='font-semibold'>{`${todo.name}`}</span> ?</p>
            <div className='flex space-x-2 mt-3'>
              <button 
                className='bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded-md mt-2 inline-block'
                onClick={(e) => handleDelete(todo.id)}
              >Delete</button>
              <button 
                className='bg-slate-500 hover:bg-slate-600 text-white px-3 py-1 rounded-md inline-block mt-2'
                onClick={onDismiss}
              >Cancel</button>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default DeleteModal