import Nav from './Nav';
import Title from './Title';
import List from './List';
import Form from './Form';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

function App() {

  const [ todo, setTodo ] = useState('')
  const [ todoItems, setTodoItems ] = useState([])
  const [ projectTitle, setProjectTitle ] = useState('Untitled List')

  useEffect(() => {
    const data = localStorage.getItem('todos');
    if ( data ) {
      setTodoItems(JSON.parse(data));
    }
    
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const todoObject = {
      id: todoItems.length ? todoItems[todoItems.length-1].id + 1 : 1,
      name: todo,
      checked: false
    }
    const newList = [...todoItems, todoObject];
    console.log(newList);
    setTodoItems(newList);
    setTodo('');
    localStorage.setItem('todos', JSON.stringify(newList));
  }  

  const handleChecked = (id) => {
    const newList = todoItems.map((item) => item.id === id ? {...item, checked: !item.checked } : item);
    console.log(newList);
    setTodoItems(newList);
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
      </main>      
    </div>
  );
}

export default App;
