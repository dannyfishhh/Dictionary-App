import brand_awareness from '../../assets/brand_awareness.svg';
import React from 'react';

function Results(props) {

    const { result } = props;

    const hasExample = result[0].meanings[0]?.definitions[0]?.example;
    const hasAudio = result[0].phonetics[0]?.audio;

    const handleClick = () => {
      new Audio(hasAudio).play();
      console.log('Audio played for:', result[0].word);
    };

    return (
        <div className='results' data-testid="results">
          <div className='word-icon'>
            <h1 className='word'>{result[0].word}</h1>
            {hasAudio && <button className='icon-button' onClick={handleClick}>
              <img src={brand_awareness} className='icon' alt='Brand Awareness Icon' />
            </button>}
          </div>
          <h2 className='word-type'>{result[0].meanings[0].partOfSpeech}</h2>
          <p className='definition'>{result[0].meanings[0].definitions[0].definition}</p>
          {hasExample && <p className='example-sentence'>{result[0].meanings[0].definitions[0].example}</p>}
        </div>
    );
}

export default Results;