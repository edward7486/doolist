import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useContext } from 'react'
import DataContext from './context/DataContext'

const EditProject = ({ title }) => {
  
  const { projectSettings, setProjectSettings, editProjectIsOpen, setEditProjectIsOpen } = useContext(DataContext);

  const editProject = (e) => {
    e.preventDefault();
    setProjectSettings({
      projectTitle: e.target[0].value,
      showCompletedList: e.target[1].checked
    })
    localStorage.setItem('projectTitle', e.target[0].value);
    localStorage.setItem('completedState', JSON.stringify(e.target[1].checked));
    setEditProjectIsOpen(false);
  }
  
  return (
    <>
    {( editProjectIsOpen && 
      <div id="editProject" className="modal">
        <div className="modal-content rounded-md max-w-xl divide-y bg-white">
          <div className="modal-header flex place-content-between items-center px-4 py-2">
            <h2 className='text-sm font-semibold text-slate-700'>{title}</h2>
            <XMarkIcon 
              className='close h-7 w-7 p-1 hover:bg-slate-100 rounded-md text-slate-500'
              onClick={(e) => setEditProjectIsOpen(false)}
              tabIndex="0"
            />
          </div>
          <div className="modal-body p-4">
            <form onSubmit={(e) => editProject(e)}>
              <label htmlFor='titleInput'>Project Name</label>
              <input 
                autoFocus
                id="titleInput"
                type="text" 
                className='border-solid border-2 px-2 py-2 mt-1 rounded-md w-full'
                value={projectSettings.projectTitle}
                onChange={(e) => (setProjectSettings({...projectSettings, projectTitle: e.target.value}))}
              /> 
              <input 
                type="checkbox"
                id="completedCheckbox"
                className='mr-2 my-4 h-4 w-4 accent-indigo-500 relative align-middle cursor-pointer'
                onChange={(e) => (
                  setProjectSettings(
                    { ...projectSettings, 
                      showCompletedList: !projectSettings.showCompletedList }
                    )
                )}
                checked={projectSettings.showCompletedList ? 'checked' : ''}
              />
              <label htmlFor='completedCheckbox' className='align-middle cursor-pointer'>Show completed items</label>
              <button className='bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded-md block mt-2' type="submit">Done</button>
            </form>
          </div>
        </div>
      </div>
    )}
    </>

  )
}

export default EditProject