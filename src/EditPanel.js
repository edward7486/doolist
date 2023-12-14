import React, { useEffect } from 'react'
import Comment from './Comment'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { 
  useNavigate,
  useParams
 } from 'react-router-dom'
import DataContext from './context/DataContext'
import { useContext } from 'react'

const EditPanel = () => {

  const { 
    todoItems, 
    completed, 
    projectSettings, 
    handleChecked, 
    handleCompletedCheck, 
    handleEditPanel,
    editPanelOpen
  } = useContext(DataContext);
  
  // Storing locally so if user refreshes the page the context is preserved(?)
  localStorage.setItem('localToDos', JSON.stringify(todoItems));
  localStorage.setItem('localCompleted', JSON.stringify(completed))
  localStorage.setItem('editPanelState', JSON.stringify(editPanelOpen));
  
  let navigate = useNavigate();
  let { id } = useParams();
  let todo = 
    todoItems.find((t) => (t.id.toString() === id)) || 
    JSON.parse(localStorage.getItem('localToDos'));
  let completedItem = 
    completed.find((c) => (c.id.toString() === id)) || 
    JSON.parse(localStorage.getItem('localCompleted'));

  if (editPanelOpen === true || null ) {
    document.body.style.overflow = "hidden";
  } else if (editPanelOpen === false) {
    document.body.style.overflow = "auto";
  }

  function onDismiss() {
    navigate(-1);
    handleEditPanel(false);
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
                className={`inline-block w-5 h-5 mr-2 cursor-pointer align-middle ${ completedItem.checked ? 'accent-slate-500' : ''}`}
                checked={ todo.checked || completedItem.checked ? 'checked' : false}
                onChange={((e) => {
                    if (todo.checked === false) {
                      handleChecked(todo.id)
                    } else if (completedItem.checked === true) {
                      handleCompletedCheck(completedItem.id)
                    }
                  }
                )}
              />
              <h2 className={`text-lg text-slate-700 font-bold inline-block align-middle ${ completedItem.checked ? 'line-through': '' }`}>
               {todo.name || completedItem.name} 
              </h2>
            </div>
            <form className='w-full mt-4' onSubmit={(e) => e.preventDefault()}>
              <textarea 
                autoFocus
                type="text"
                placeholder="Add comment"
                className='p-2 mt-2 mr-2 w-full border-2 rounded-md'
              />
              <button 
                type="submit"
                className='bg-indigo-700 hover:bg-indigo-800 text-white px-3 py-1 rounded-md inline-block'
              >
                Save
              </button>
            </form>
            <div className="comment-section mt-2 space-y-1">
              <h2 className='text-xs text-slate-700 font-semibold'>History</h2>
              <div className='comment'>
                <div className='bg-slate-100 p-2 text-slate-700 rounded-md'>
                  <span className='text-xs'>12/12/23 6:00PM</span>
                  <div className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fermentum suscipit sem ut rutrum. Quisque eu magna et nibh blandit vehicula. Suspendisse et sagittis neque.</div>
                </div>
              </div>
              <div className='comment'>
                <div className='bg-slate-100 p-2 text-slate-700 rounded-md'>
                  <span className='text-xs'>12/12/23 6:00PM</span>
                  <div className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fermentum suscipit sem ut rutrum. Quisque eu magna et nibh blandit vehicula. Suspendisse et sagittis neque.</div>
                </div>
              </div>
              <div className='comment'>
                <div className='bg-slate-100 p-2 text-slate-700 rounded-md'>
                  <span className='text-xs'>12/12/23 6:00PM</span>
                  <div className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fermentum suscipit sem ut rutrum. Quisque eu magna et nibh blandit vehicula. Suspendisse et sagittis neque.</div>
                </div>
              </div>
              <div className='comment'>
                <div className='bg-slate-100 p-2 text-slate-700 rounded-md'>
                  <span className='text-xs'>12/12/23 6:00PM</span>
                  <div className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fermentum suscipit sem ut rutrum. Quisque eu magna et nibh blandit vehicula. Suspendisse et sagittis neque.</div>
                </div>
              </div>              

            </div>
          </div>

          <div className='edit-sidebar col-span-4 text-xs bg-slate-50 p-4 space-y-3 text-slate-700'>
            <div>
              <span className='block font-semibold'>Added</span>
              <div className='mt-1'>
                <span>{todo.created || completedItem.created}</span>
              </div>              
            </div>         
          </div>

        </div>



      </div>
    </div>
  )
}

export default EditPanel