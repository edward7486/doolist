import Nav from './Nav';
import Title from './Title';
import List from './List';
import Completed from './Completed';
import Form from './Form';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

function App() {

  const [ todo, setTodo ] = useState('');
  const [ todoItems, setTodoItems ] = useState([]);
  const [ completed, setCompleted ] = useState([]);
  const [ projectTitle, setProjectTitle ] = useState('My Doolist');

  useEffect(() => {

    const data = localStorage.getItem('todos');
    if ( data ) {
      setTodoItems(JSON.parse(data));
    }
    
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const todoObject = {
      id: todoItems.length ? todoItems[todoItems.length-1].id + 1 : 1,
      name: todo,
      checked: false
    }
    const newList = [...todoItems, todoObject];
    setTodoItems(newList);
    setTodo('');
    localStorage.setItem('todos', JSON.stringify(newList));
  }  

  const handleChecked = (id) => {
    // Checking the item
    todoItems.map(item => (
      item.id === id ? {...item, checked: !item.checked } : item
    ))
    
    // Updating completed list 
    const itemToRemove = todoItems.filter(item => item.id === id);
    const newCompleted = [...completed, itemToRemove[0]];
    console.log(newCompleted);
    setCompleted(newCompleted);

    // Updating list
    const newList = todoItems.filter((item) => item.id !== id );
    setTodoItems(newList);

    // Local storage calls
    localStorage.setItem('todos', JSON.stringify(newList));
  }

  return (
    <div className="App">
      <Nav />
      <main className="max-w-3xl px-2 sm:px-6 lg:px-8 m-auto">
        <Title 
          projectTitle={projectTitle}
          setProjectTitle={setProjectTitle}
        />
        <Form 
          handleSubmit={handleSubmit}
          todo={todo}
          setTodo={setTodo}
        />
        <List 
          todoItems={todoItems}
          todo={todo}
          setTodo={setTodo}
          setTodoItems={setTodoItems}
          handleSubmit={handleSubmit}
          handleChecked={handleChecked}
        />
        <Completed 
          completed={completed}
        />
      </main>      
    </div>
  );
}

export default App;
