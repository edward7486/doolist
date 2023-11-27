import Nav from './Nav';
import Title from './Title';
import List from './List';
import Completed from './Completed';
import Form from './Form';
import EditProject from './EditProject';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

function App() {

  const [ todo, setTodo ] = useState('');
  const [ todoItems, setTodoItems ] = useState([]);
  const [ completed, setCompleted ] = useState([]);
  const [ projectSettings, setProjectSettings ] = useState(
    {
      projectTitle: 'My Doolist',
      showCompletedList: false
    }
  )

  useEffect(() => {

    // Fetch todos from local storage
    const todos = localStorage.getItem('todos');
    if ( todos ) {
      setTodoItems(JSON.parse(todos));
    }

    // Fetch project settings from local storage
    const fetchTitle = localStorage.getItem('projectTitle');
    const fetchCompletedState = localStorage.getItem('completedState');
    setProjectSettings({projectTitle: fetchTitle, showCompletedList: JSON.parse(fetchCompletedState)});
    console.log(fetchCompletedState);

    // Fetch completed items list
    const fetchCompleted = localStorage.getItem('completedItems');
    if (fetchCompleted) {
      setCompleted(JSON.parse(fetchCompleted));
    }
    
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const todoObject = {
      id: uniqueId(),
      name: todo,
      checked: false
    }
    const newList = [...todoItems, todoObject];
    setTodoItems(newList);
    setTodo('');
    localStorage.setItem('todos', JSON.stringify(newList));
  }  

  const uniqueId = () => {
    return Math.floor((Date.now() * Math.random()) / 1000);
  }

  const handleChecked = (id) => {
    // Checking the item
    todoItems.map(item => (
      item.id === id ? {...item, checked: !item.checked } : item
    ))
    
    // Updating completed list 
    const itemToRemove = todoItems.filter(item => item.id === id);
    const newCompleted = [...completed, itemToRemove[0]];
    setCompleted(newCompleted);
    localStorage.setItem('completedItems', JSON.stringify(newCompleted));

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
          projectTitle={projectSettings.projectTitle}
        />
        <Form 
          handleSubmit={handleSubmit}
          todo={todo}
          setTodo={setTodo}
        />
        <EditProject 
          projectSettings={projectSettings}
          setProjectSettings={setProjectSettings}
          title={'Project Settings'}
        />
        <List 
          todoItems={todoItems}
          todo={todo}
          setTodo={setTodo}
          setTodoItems={setTodoItems}
          handleSubmit={handleSubmit}
          handleChecked={handleChecked}
        />
        {projectSettings.showCompletedList && <Completed 
          completed={completed}
          setCompleted={setCompleted}
        />
        }
      </main>      
    </div>
  );
}

export default App;
