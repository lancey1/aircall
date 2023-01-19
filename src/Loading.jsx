import React from "react";

export default function Loading(props) {
    return (
      <div className="spinnerContainer">
        <div className="loadingSpinner"></div>
        <p>{props.text}</p>
      </div>
    );
  }
  