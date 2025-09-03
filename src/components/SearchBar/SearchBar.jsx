import React, { useState } from 'react';

function SearchBar(props) {

    // takes in a function as a prop

    const { returnResults } = props;

    // sets state for the text input to be updated, and for an error message state

    const [input, setInput] = useState('');
    const [error, setError] = useState('');

    // event handlers: update text input, clear error message, and submit form

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
            <form className='word-search' data-testid="searchBar">
                <input value={input} onClick={handleClick} onChange={handleInputChange} style={error ? { borderColor: 'red', borderWidth: '2px', borderStyle: 'solid' } : {}} type='text' placeholder='Type the word here' className='word-input' />
                <button className='submit-button' onClick={handleSubmit}>Search</button>
            </form>
            {error && <p className='error-message'>{error}</p>}
        </>

    )
}

export default SearchBar;