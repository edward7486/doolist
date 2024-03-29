import React from 'react'
import CompletedListItem from './CompletedListItem'
import { useContext } from 'react'
import DataContext from '../context/DataContext'

const Completed = () => {
  
  const { todoItems, setTodoItems, projectSettings } = useContext(DataContext);
  const completedItems = todoItems.filter(item => item.checked === true);

  const handleClear = () => {
    const newList = todoItems.filter(item => item.checked !== true);
    setTodoItems(newList);
    localStorage.setItem('todos', JSON.stringify(newList));
  }

  return (
    <>
      {( projectSettings.showCompletedList && 
        <>
        <hr className='mb-5'/>
        <div className='flex items-center place-content-between mb-2'>
          <p className=' text-slate-400'>Completed Items</p>
          <button 
            className="ml-2 text-sm text-slate-500 font-bold bg-slate-100 px-2 py-1 rounded-full hover:bg-slate-200"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
        <ul className='completedList'>
          { completedItems.map((item) => 
            <CompletedListItem 
              key={item.id} 
              item={item}
            />
          )}
        </ul>
      </>
      )}
    </>
  )
}

export default Completed