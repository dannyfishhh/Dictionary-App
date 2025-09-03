import Results from './components/Results/Results';
import SearchBar from './components/SearchBar/SearchBar';
import Error from './components/Error/Error';
import Loading from './components/Loading/Loading';
import { useState } from 'react';
import apiFetch from './helpers/apiFetch';
import { defaultResult } from './helpers/defaultResult';
import React from 'react';

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
