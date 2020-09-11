import React from 'react';

import './Controls.css';


type ControlsProps = {
  onAdvance: () => void,
  onReset: () => void,
  onAutomate: () => void,
}

const Controls:React.FC<ControlsProps> = (props) => {
  
  return (
    <div className="Controls">
      <button onClick={ props.onAdvance }>
        Advance Generation
      </button>

      <button onClick={ props.onReset }>
        Restart
      </button>

      <button onClick={ props.onAutomate }>
        Toggle Automate
      </button>
    </div>
  );
}
export default Controls;