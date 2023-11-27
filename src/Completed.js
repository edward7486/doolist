import React from 'react'
import CompletedListItem from './CompletedListItem'

const Completed = ({ completed, setCompleted }) => {
  return (
    <>
      <hr className='mb-5'/>
      <div className='flex items-center place-content-between mb-2'>
        <p className=' text-slate-400'>Completed Items</p>
        <button 
          className="ml-2 text-sm text-slate-500 font-bold bg-slate-100 px-2 py-1 rounded-full hover:bg-slate-200"
          onClick={(e) => setCompleted([])}
        >
            Clear
        </button>
      </div>
      <ul className='completedList'>
        { completed.map((item) => <CompletedListItem key={item.id} item={item}/>)}
      </ul>
    </>
  )
}

export default Completed