import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const EditPanel = () => {

  return (
    <div className='modal hidden edit-panel'>
      <div className="modal-content rounded-md max-w-xl divide-y bg-white">
        <div className="modal-header flex place-content-between p-4">
          <h2 className='text-lg font-bold'>Task: Task Name</h2>
          <XMarkIcon 
            className='close h-7 w-7 p-1 hover:bg-slate-100 rounded-md text-slate-500'
            tabIndex="0"
          />
        </div>
        <div className="modal-body p-4">
          This is a task
        </div>
      </div>
    </div>
  )
}

export default EditPanel