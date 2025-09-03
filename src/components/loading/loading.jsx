import React from "react";

function Loading() {
  
  // returns a skeleton loading screen with pulsing effect

  return (
    <div className="loading" data-testid="loading">
      <div className="skeleton skeleton-word" role="loading"></div>
      <div className="skeleton skeleton-word-type" role="loading"></div>
      <div className="skeleton skeleton-definition" role="loading"></div>
      <div className="skeleton skeleton-example" role="loading"></div>
    </div>  
  );
}

export default Loading;