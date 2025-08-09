import Results from './components/results/results';
import SearchBar from './components/search-bar/search-bar';
import { useState } from 'react';
import apiFetch, {defaultResult} from './functions/apiFetch';

function App() {
  const [result, setResult] = useState(defaultResult);

  const returnResults = async (word) => {
    try {
    const data = await apiFetch(word);
    setResult(data);
    console.log(data);
  } catch (error) {
    console.error('Error fetching results:', error);
    setResult(defaultResult);
  }
  }; 

  return (
    <div className='container'>
      <SearchBar returnResults={returnResults} />
      <Results result={result} />
    </div>
  )
}

export default App
