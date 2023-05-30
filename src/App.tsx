import { useState } from 'react';
import './App.css';
import Card from './components/Card';
import TodoList from './components/TodoList';
import SlidePopUp from './components/SlidePopup';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className='container mx-auto bg-white'>
        <div className='flex justify-center items-center min-h-screen'>
          <Card title='Todos Maker' description='Improvement at your own way.'>
            <TodoList />
          </Card>
          <SlidePopUp />
        </div>
      </div>
    </>
  );
}

export default App;
