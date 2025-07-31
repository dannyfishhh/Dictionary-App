import brand_awareness from './assets/brand_awareness.svg';

function App() {

  return (
    <div className='container'>
        <div className='word-search'>
          <input type='text' placeholder='Type the word here' className='word-input' />
          <button className='submit-button'>Search</button>
        </div>
        <div className='results'>
          <div className='word-icon'>
            <h1 className='word'>joy</h1>
            <button className='icon-button'>
              <img src={brand_awareness} className='icon' alt='Brand Awareness Icon' />
            </button>
          </div>
          <h2 className='word-type'>noun</h2>
          <p className='definition'>a feeling of great pleasure or happiness</p>
          <p className='example-sentence'>they were filled with joy when their first child was born</p>
        </div>
    </div>
  )
}

export default App
