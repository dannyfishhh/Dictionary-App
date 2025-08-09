import { useState } from 'react';

function SearchBar(props) {

    const { returnResults } = props;

    const [input, setInput] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleClick = () => {
        setError('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.length > 0) {
            returnResults(input);
        } else {
            setError('Please enter a word to search.');
        }
    };

    return (
        <>
            <div className='word-search'>
                <input value={input} onClick={handleClick} onChange={handleInputChange} style={error ? { borderColor: 'red', borderWidth: '2px', borderStyle: 'solid' } : {}} type='text' placeholder='Type the word here' className='word-input' />
                <button className='submit-button' onClick={handleSubmit}>Search</button>
            </div>
            {error && <p className='error-message'>{error}</p>}
        </>

    )
}

export default SearchBar;