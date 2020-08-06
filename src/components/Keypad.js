import React from "react";
import "../css/Keypad.css";

const Keypad = ({ onClick }) => {
  return (
    <div className="buttonContainer">
      <button name="1" className="button" onClick={e => onClick(e.target.name)}>
        1
      </button>
      <button name="2" className="button" onClick={e => onClick(e.target.name)}>
        2
      </button>
      <button name="3" className="button" onClick={e => onClick(e.target.name)}>
        3
      </button>
      <br />

      <button name="4" className="button" onClick={e => onClick(e.target.name)}>
        4
      </button>
      <button name="5" className="button" onClick={e => onClick(e.target.name)}>
        5
      </button>
      <button name="6" className="button" onClick={e => onClick(e.target.name)}>
        6
      </button>
      <br />

      <button name="7" className="button" onClick={e => onClick(e.target.name)}>
        7
      </button>
      <button name="8" className="button" onClick={e => onClick(e.target.name)}>
        8
      </button>
      <button name="9" className="button" onClick={e => onClick(e.target.name)}>
        9
      </button>
      <br />
      <button
        className="backAndClearButton"
        aria-label="backspace"
        name="backspace"
        onClick={e => onClick(e.target.name)}
      >
        back
      </button>

      <button
        className="backAndClearButton"
        aria-label="clear"
        name="clear"
        onClick={e => onClick(e.target.name)}
      >
        clear
      </button>
      <br />
      <button
        className="unlockButton"
        name="unlock"
        data-testid="unlockbutton"
        onClick={e => onClick(e.target.name)}
      >
        Unlock
      </button>
    </div>
  );
};

export default Keypad;
