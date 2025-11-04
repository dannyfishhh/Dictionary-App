import brand_awareness from '../../assets/brand_awareness.svg';
import styles from './Results.module.css';
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
        <div className={styles.results} data-testid="results">
          <div className={styles['word-icon']}>
            <h1 className={styles.word}>{result.word}</h1>
            {hasAudio && <button className={styles  ['icon-button']} onClick={handleClick}>
              <img src={brand_awareness} className={styles.icon} alt='Brand Awareness Icon' />
            </button>}
          </div>
          <h2 className={styles['word-type']}>{result.wordType}</h2>
          <p className={styles.definition}>{result.definition}</p>
          {hasExample && <p className={styles['example-sentence']}>{result.example}</p>}
        </div>
    );
}

export default Results;