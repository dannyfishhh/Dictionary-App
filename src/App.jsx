import Results from './components/Results/Results';
import SearchBar from './components/SearchBar/SearchBar';
import Error from './components/Error/Error';
import Loading from './components/Loading/Loading';
import useResults from './helpers/useResults';
import React from 'react';

function App() {
  const { result, error, loading, returnResults } = useResults();

  return (
    <div className='container'>
      <SearchBar returnResults={returnResults} />
      {error ? <Error error={error} /> : loading ? <Loading /> : <Results result={result} />}
    </div>
  )
}

export default App
