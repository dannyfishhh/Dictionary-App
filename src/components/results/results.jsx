import brand_awareness from '../../assets/brand_awareness.svg';
import React from 'react';

function Results(props) {

  // takes the result state from useResults and renders it accordingly

    const { result } = props;

    // checks if the results contain an example or audio, which is then later added or omitted from rendering

    const hasExample = result.example;
    const hasAudio = result.audio;

    // event handler for audio button

    const handleClick = () => {
      new Audio(hasAudio).play();
      console.log('Audio played for:', result.word);
    };

    return (
        <div className='results' data-testid="results">
          <div className='word-icon'>
            <h1 className='word'>{result.word}</h1>
            {hasAudio && <button className='icon-button' onClick={handleClick}>
              <img src={brand_awareness} className='icon' alt='Brand Awareness Icon' />
            </button>}
          </div>
          <h2 className='word-type'>{result.wordType}</h2>
          <p className='definition'>{result.definition}</p>
          {hasExample && <p className='example-sentence'>{result.example}</p>}
        </div>
    );
}

export default Results;