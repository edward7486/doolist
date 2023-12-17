import React from 'react'

const Comment = ({ comment }) => {
  return (
    <div className='comment'>
      <div className='bg-slate-100 p-2 text-slate-700 rounded-md'>
        <span className='text-xs'>{comment.timestamp}</span>
        <div className='text-sm'>{comment.comment}</div>
      </div>
    </div>
  )
}

export default Comment