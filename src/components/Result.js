import React from "react";
import "../css/Result.css";

const Result = ({ result, onChange }) => {
  return (
    <div className="result">
      <input
        maxLength={4}
        type="phone"
        aria-label="input-code"
        data-testid="input-code"
        placeholder="Enter code"
        onChange={onChange}
        value={result}
      />
    </div>
  );
};

export default Result;
