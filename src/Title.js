import React from 'react'
import { Cog8ToothIcon } from '@heroicons/react/24/outline'

const Title = ({ projectTitle }) => {
  
  const openEditProject = () => {
    const modal = document.getElementById('editProject');
    modal.classList.remove('hidden')
  }
  
  return (
    <div className="flex justify-between items-center mt-5">
      <h1 className="text-xl block font-bold mt-2 mb-2">{projectTitle}</h1>
      <div className='group relative'>      
        <Cog8ToothIcon
          className="h-8 w-8 p-1 hover:bg-slate-100 rounded-md text-slate-500 cursor-pointer"
          onClick={openEditProject} 
          tabIndex="1"
        />
        <span className='rounded-md px-2 py-1 -top-[30px] pointer-events-none absolute right-0 w-max opacity-0 transition-opacity group-hover:opacity-100 text-sm text-white bg-slate-900'>Edit project settings</span>
      </div>

    </div>
  )
}

export default Title