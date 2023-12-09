import Nav from './Nav';
import Title from './Title';
import List from './List';
import Completed from './Completed';
import Form from './Form';
import EditProject from './EditProject';
import EditPanel from './EditPanel';
import DataContext from './context/DataContext';
import { useContext } from 'react';

function App() {

  const { projectSettings } = useContext(DataContext)

  return (
    <div className="App">

      <Nav />
      <main className="max-w-3xl px-2 sm:px-6 lg:px-8 m-auto">
        <Title />
        <Form />
        <EditProject title={'Project Settings'} />
        <EditPanel />
        <List />
        { projectSettings.showCompletedList && <Completed /> }
      </main>

    </div>
  );
}

export default App;
