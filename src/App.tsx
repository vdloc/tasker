import './App.css';
import AppCard from './components/AppCard';

function App() {
  return (
    <>
      <div className='container mx-auto bg-white'>
        <div className='flex justify-center items-center min-h-screen'>
          <AppCard title='The TooDoo' description='Achieve your goals' />
        </div>
      </div>
    </>
  );
}

export default App;
