import './App.css';
import Card from './components/Card';

function App() {
  return (
    <>
      <div className='container mx-auto bg-white'>
        <div className='flex justify-center items-center min-h-screen'>
          <Card title='The TooDoo' description='Achieve your goals' />
        </div>
      </div>
    </>
  );
}

export default App;
