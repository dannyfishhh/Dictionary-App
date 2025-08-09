import brand_awareness from '../../assets/brand_awareness.svg';

function Results(props) {

    const { result } = props;

    if (!result) {
        return null;
    }
    
    return (
        <div className='results'>
          <div className='word-icon'>
            <h1 className='word'>{result[0].word}</h1>
            <button className='icon-button'>
              <img src={brand_awareness} className='icon' alt='Brand Awareness Icon' />
            </button>
          </div>
          <h2 className='word-type'>{result[0].meanings[0].partOfSpeech}</h2>
          <p className='definition'>{result[0].meanings[0].definitions[0].definition}</p>
          <p className='example-sentence'>{result[0].meanings[0].definitions[0].example}</p>
        </div>
    );
}

export default Results;