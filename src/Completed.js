import React from 'react'
import CompletedListItem from './CompletedListItem'

const Completed = ({ completed }) => {
  return (
    <>
      <hr />
      <p className='mt-5 text-slate-400'>Completed Items</p>
      <ul className='completedList'>
        { completed.map((item) => <CompletedListItem key={item.id} item={item}/>)}
      </ul>
    </>
  )
}

export default Completed