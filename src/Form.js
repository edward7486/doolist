import React from 'react'

const Form = ({ handleSubmit, todo, setTodo }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          autoFocus
          type="text" 
          placeholder="Add to do item"
          className="border-solid border-2 px-2 py-2 mb-2 rounded-md w-full"
          value={todo}
          onChange={(e) => { setTodo(e.target.value) } }
        />
      </form>
    </>
  )
}

export default Form