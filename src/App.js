import Nav from './Nav';
import List from './List';
import Form from './Form';
import { useState, useEffect } from 'react';

function App() {

  const [ todo, setTodo ] = useState('')
  const [ todoItems, setTodoItems ] = useState([])

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
      <main className="grid grid-cols-12 justify-center mx-auto max-w-7xl px-24">
        <div className="col-span-4 mt-5">
          Sidebar
        </div>
        <div className="main col-span-8">
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
        </div>
      </main>
      
    </div>
  );
}

export default App;
