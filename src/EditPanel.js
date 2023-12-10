import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { 
  useNavigate,
  useParams,
 } from 'react-router-dom'
import DataContext from './context/DataContext'
import { useContext } from 'react'

const EditPanel = () => {

  const { todoItems } = useContext(DataContext);
  localStorage.setItem('localToDos', JSON.stringify(todoItems));
  
  let navigate = useNavigate();
  let { id } = useParams();
  let todo = todoItems.find((todo) => (todo.id.toString() === id)) || JSON.parse(localStorage.getItem('localToDos'));

  function onDismiss() {
    navigate(-1);
  }

  return (
    <div className='modal edit-panel'>
      <div className="modal-content rounded-md max-w-xl divide-y bg-white">
        <div className="modal-header flex place-content-between p-4">
          <h2 className='text-lg font-bold'>{todo.name} </h2>
          <XMarkIcon 
            className='close h-7 w-7 p-1 hover:bg-slate-100 rounded-md text-slate-500'
            tabIndex="0"
            onClick={onDismiss}
          />
        </div>
        <div className="modal-body p-4">
          This is task {todo.id} and it is {todo.checked ? 'done' : 'not done yet.'}
        </div>
      </div>
    </div>
  )
}

export default EditPanel