import logo from './logo.svg';
import './App.css';
import { useQuery } from '@apollo/client';
import { DATA, GET_USER } from './query';

function App() {
  // const { data, loading, error } = useQuery(DATA);

  const { data, loading, error } = useQuery(GET_USER);


  if(loading) {
    return <div>Loading...</div>
  }

  if(error) {
    return <div>Error</div>
  }
  return (
    <div className="App">
      <h3>GraphQl Integration with React</h3>
      {/* <div>
        <h6>{data?.hello}</h6>
      </div> */}
      {
        data?.getUser?.map((e) => (
          <div> 
            <h6>FirstName : {e?.firstName}</h6>
            <h6>Age : {e?.age}</h6>
          </div>
        ))
      }
    </div>
  );
}

export default App;
