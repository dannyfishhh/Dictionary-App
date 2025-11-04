import React from "react";
import styles from './Loading.module.css';

function Loading() {
  
  // returns a skeleton loading screen with pulsing effect

  return (
    <div className={styles.loading} data-testid="loading">
      <div className={`${styles.skeleton} ${styles['skeleton-word']}`} role="loading"></div>
      <div className={`${styles.skeleton} ${styles['skeleton-word-type']}`} role="loading"></div>
      <div className={`${styles.skeleton} ${styles['skeleton-definition']}`} role="loading"></div>
      <div className={`${styles.skeleton} ${styles['skeleton-example']}`} role="loading"></div>
    </div>  
  );
}

export default Loading;