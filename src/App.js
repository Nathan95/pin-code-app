import React, { useState, useEffect } from "react";
import Spinner from "./components/Spinner";
import Result from "./components/Result";
import Keypad from "./components/Keypad";

import "./App.css";
import "./css/Result.css";

function App() {
  //correctCombination: 1995

  const [result, setResult] = useState("");
  const [locked, setLocked] = useState("Locked");
  const [tries, setTries] = useState(0);
  const [hide, setHide] = useState(true);
  const [warning, setWarning] = useState(false);

  //Along with the maxLength property on the input,
  //this is also needed for the keypad
  useEffect(() => {
    (function() {
      if (result >= 4) {
        setResult(result.slice(0, 4));
      }
    })();
  }, [result]);

  const onClick = button => {
    switch (button) {
      case "unlock":
        checkCode();
        break;
      case "clear":
        clear();
        break;
      case "backspace":
        backspace();
        break;
      default:
        setResult(result + button);
        break;
    }
  };

  const checkCode = () => {
    if (result === "1995") {
      setLocked("Unlocked!");
      setHide(false);
      setTimeout(() => {
        setHide(true);
      }, 3000);
      setTries(0);
    } else if (tries === 2) {
      //hide the keypad
      setHide(false);
      //change the status message
      setLocked("Too many incorrect attempts!");
      //reset the tries
      setTries(0);
      setTimeout(() => {
        setHide(true);
      }, 3000);
    } else {
      setLocked("Incorrect entry");
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 500);
      setTries(tries + 1);
    }
  };

  const clear = () => {
    setResult("");
  };

  const backspace = () => {
    setResult(result.slice(0, -1));
  };

  const handleChange = event => {
    setResult(event.target.value);
  };

  return (
    <div className="App">
      <div className="pin-body">
        <h1>Pin Pad</h1>
        <div className={`status ${warning ? "shake" : ""}`}>
          <h2 data-testid="status">{locked}</h2>
        </div>
        <div className="result">
          {hide ? (
            <Result result={result} onChange={handleChange} />
          ) : (
            <Spinner />
          )}
        </div>
        {hide ? <Keypad onClick={onClick} /> : false}
      </div>
    </div>
  );
}

export default App;
