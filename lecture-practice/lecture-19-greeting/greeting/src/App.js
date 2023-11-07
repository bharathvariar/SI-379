import logo from './logo.svg';
import './App.css';
import Greeting from './Greeting';

function App() { // App() is a function component
  return (
    <div>
      This is my greeting application!
      <Greeting name="Bharath" />
      <Greeting name='SI-379' />
    </div>
  );
}

export default App;