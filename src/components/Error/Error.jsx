import React from "react";
import errorStyles from './Error.module.css';
import resultStyles from '../Results/Results.module.css';

function Error(props) {

    // takes the error state from useResults and renders it accordingly

    const error = props.error;
    
    return(
        <div className={`${resultStyles.results} ${resultStyles.error}`} data-testid="error">
            <div className={resultStyles['word-icon']}>
                <h1 className={`${resultStyles.word} ${errorStyles.error}`}>error</h1>
            </div>
            <h2 className={`${resultStyles['word-type']} ${errorStyles['error-light']}`}>{error.type}!</h2>
            <p className={`${resultStyles.definition} ${errorStyles.error}`}>{error.message}</p>
            <p className={`${resultStyles['example-sentence']} ${errorStyles['error-light']}`}>please try again</p>
        </div>
    )
}

export default Error;