function Error(props) {

    const error = props.error;
    
    return(
        <div className='results error'>
            <div className='word-icon'>
                <h1 className='word error'>error</h1>
            </div>
            <h2 className='word-type error-light'>{error.type}!</h2>
            <p className='definition error'>{error.message}</p>
            <p className='example-sentence error-light'>please try again</p>
        </div>
    )
}

export default Error;