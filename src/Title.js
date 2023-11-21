import React from 'react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'

const Title = ({ projectTitle, setProjectTitle }) => {
  return (
    <div className="group flex justify-between items-center mt-5">
      <h1 className="text-xl block font-bold mt-2 mb-2">{projectTitle}</h1>
      <EllipsisVerticalIcon className="hidden group-hover:block h-6 w-6" />
    </div>
  )
}

export default Title