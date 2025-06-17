import logo from './logo.svg';
import './App.css';
import { useQuery } from '@apollo/client';
import { DATA } from './query';

function App() {
  const { data, loading, error } = useQuery(DATA)

  if(loading) {
    return <div>Loading...</div>
  }

  if(error) {
    return <div>Error</div>
  }
  return (
    <div className="App">
      <h3>GraphQl Integration with React</h3>
      <div>
        <h6>{data?.hello}</h6>
      </div>
    </div>
  );
}

export default App;
