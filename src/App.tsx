import { useState } from 'react';
import './App.css';
import Card from './components/Card';
import TodoList from './components/TodoList';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className='container'>
        <Card title='Todos Maker' description='Improvement at your own way.'>
          <TodoList />
        </Card>
      </div>
    </>
  );
}

export default App;
