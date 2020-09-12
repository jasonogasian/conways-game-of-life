import React, { useState } from 'react';

import './Controls.css';
import { appMode, generateOptions } from 'components/App/App';


type ControlsProps = {
  mode: appMode,
  onAdvance: () => void,
  onReset: () => void,
  onAutomate: () => void,
  onGenerate: (options:generateOptions | null) => void,
}

const Controls:React.FC<ControlsProps> = (props) => {
  const [ x, setX ] = useState(10);
  const [ y, setY ] = useState(10);

  const mode = props.mode;
  const autoText = mode === 'automating' ? 'Stop' : 'Automate';
  const genText = mode === 'generate' ? 'Use' : 'Create';


  const handleGenerateClick = () => {
    if (mode === 'generate') {
      props.onGenerate({x, y});
    }
    else {
      props.onGenerate(null);
    }
  }
  
  
  return (
    <div className="Controls">
      <button onClick={ props.onAdvance }>
        Step
      </button>

      <button onClick={ props.onReset }>
        Restart
      </button>

      <button onClick={ props.onAutomate }>
        { autoText }
      </button>

      <button onClick={ handleGenerateClick }>
        { genText }
      </button>

      {
        mode === 'generate' &&
        <div className="generate-form">
          <label>
            X:
            <input type="number" value={ x } onChange={ e => setX(parseInt(e.target.value)) } />
          </label>

          <label>
            Y:
            <input type="number" value={ y } onChange={ e => setY(parseInt(e.target.value)) } />
          </label>
        </div>
      }
    </div>
  );
}
export default Controls;