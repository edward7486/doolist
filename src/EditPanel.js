import React, { useState } from 'react'
import Comment from './Comment'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { 
  useNavigate,
  useParams
 } from 'react-router-dom'
import DataContext from './context/DataContext'
import { useContext } from 'react'
import DateObject from 'react-date-object';

const EditPanel = () => {

  const { 
    todoItems,
    setTodoItems, 
    projectSettings, 
    handleChecked, 
    handleEditPanel,
    editPanelOpen,
    uniqueId
  } = useContext(DataContext);
  
  let navigate = useNavigate();
  let { id } = useParams();
  const [ comment, setComment ] = useState('');

  // Storing locally so if user refreshes the page the context is preserved
  localStorage.setItem('localToDos', JSON.stringify(todoItems));
  localStorage.setItem('editPanelState', JSON.stringify(editPanelOpen));

  let todo = todoItems.find((t) => (t.id.toString() === id)) || 
  localStorage.getItem('todo');
  localStorage.setItem('todo', JSON.stringify(todo));

  // Prevent background scroll on edit panel open
  if (editPanelOpen === true || null ) {
    document.body.style.overflow = "hidden";
  } else if (editPanelOpen === false) {
    document.body.style.overflow = "auto";
  }

  function onDismiss() {
    navigate(-1);
    handleEditPanel(false);
  };

  const handleCommentSubmit = (e, id) => {
    e.preventDefault();
    const theItem = todoItems.find((item) => item.id === id);

    if (Object.hasOwn(theItem, 'comments')) {
      const newList = todoItems.map((item) => item.id === id ? { ...item, 
        comments: [ ...item.comments, 
        {
          comment,
          id: uniqueId(),
          timestamp: new DateObject().format('MM/DD/YYYY, hh:mm a')
        }
       ] } : item)
       setTodoItems(newList);
       localStorage.setItem('todos', JSON.stringify(newList));
      } else {
        const newList2 = todoItems.map((item) => item.id === id ? { ...item,
          comments: [
            {
              comment,
              id: uniqueId(),
              timestamp: new DateObject().format('MM/DD/YYYY, hh:mm a')          
            }
          ]
        } : item)
        setTodoItems(newList2);
        localStorage.setItem('todos', JSON.stringify(newList2));
    }  
    setComment('');
  }

  return (
    <div className='modal edit-panel'>
      <div className="modal-content rounded-md max-w-xl bg-white divide-y">

        <div className="modal-header flex place-content-between items-center px-4 py-2">
          <p className="text-sm font-semibold text-slate-700">{projectSettings.projectTitle}</p>
          <XMarkIcon 
            className='close h-7 w-7 p-1 hover:bg-slate-100 rounded-md text-slate-500'
            tabIndex="0"
            onClick={onDismiss}
          />
        </div>

        <div className="modal-body grid grid-cols-12">
          <div className='col-span-8 p-4'>
            <div>          
              <input 
                type="checkbox"
                className={`inline-block w-5 h-5 mr-2 cursor-pointer align-middle ${todo.checked ? 'accent-slate-500' : ''}`}
                checked={ todo.checked ? 'checked' : false}
                onChange={(e) => handleChecked(todo.id)} 
              />
              <h2 className={`text-lg font-bold inline-block align-middle ${todo.checked ? 'line-through' : ''}`}>
               {todo.name} 
              </h2>
            </div>
            <form className='w-full mt-4' onSubmit={(e) => handleCommentSubmit(e, todo.id)}>
              <textarea 
                autoFocus
                required
                name="add a comment"
                type="text"
                placeholder="Add a comment"
                className='p-2 mt-2 mr-2 w-full border-2 rounded-md text-sm'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button 
                type="submit"
                className='bg-indigo-700 hover:bg-indigo-800 text-white px-3 py-1 rounded-md inline-block'
              >
                Save
              </button>
            </form>
            <div className="comment-section mt-2 space-y-1">
              <span className='font-semibold text-xs'>Comments</span>
              <div className='space-y-3'>
                {( 
                  todo.comments ?
                  todo.comments.map((comment) => (
                    <Comment 
                      comment={comment}
                      key={comment.id}
                    />
                  )) : <p className='text-slate-500 text-sm'>There are no comments</p> 
                )}
              </div>            
            </div>
          </div>

          <div className='edit-sidebar col-span-4 text-xs bg-slate-50 p-4 space-y-3 text-slate-700'>
            <div>
              <span className='block font-semibold'>Added</span>
              <div className='mt-1'>
                <span>{todo.created}</span>
              </div>              
            </div>         
          </div>

        </div>



      </div>
    </div>
  )
}

export default EditPanel