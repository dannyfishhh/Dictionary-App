import Results from './components/results/results';
import SearchBar from './components/search-bar/search-bar';
import Error from './components/error/error';
import Loading from './components/loading/loading';
import { useState } from 'react';
import apiFetch, {defaultResult} from './functions/apiFetch';


function App() {
  const [result, setResult] = useState(defaultResult);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const returnResults = async (word) => {
    setError(null);
    setLoading(true);
    try {
      const data = await apiFetch(word);
      setResult(data);
      console.log(data);
      setLoading(false);
  } catch (error) {
      console.error('Error fetching results:', error);
      setError(error);
      setLoading(false);
  }
  }; 

  return (
    <div className='container'>
      <SearchBar returnResults={returnResults} />
      {error ? <Error error={error} /> : loading ? <Loading /> : <Results result={result} />}
    </div>
  )
}

export default App
