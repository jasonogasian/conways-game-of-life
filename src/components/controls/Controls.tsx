import React, { useState } from 'react';

import './Controls.css';
import { generateOptions } from 'lib/utils';

type controleMode = 'generate' | 'automating' | 'normal';


type ControlsProps = {
  onAdvance: () => void,
  onReset: () => void,
  onAutomate: () => void,
  onUpdateGridSize: (options:generateOptions | null) => void,
}

const Controls:React.FC<ControlsProps> = (props) => {
  const [ mode, setMode ] = useState<controleMode>('normal');
  const [ x, setX ] = useState(20);
  const [ y, setY ] = useState(15);

  const autoText = mode === 'automating' ? 'Stop' : 'Automate';
  const genText = mode === 'generate' ? 'Use' : 'Create';


  const handleInputChange = (x:number, y:number) => {
    setX(x);
    setY(y);
    props.onUpdateGridSize({x, y});
  }


  const handleGenerateClick = () => {
    if (mode === 'generate') {
      setMode('normal');
      props.onUpdateGridSize(null);
    }
    else if (mode === 'normal') {
      setMode('generate');
      props.onUpdateGridSize({x, y});
    }
  }


  const handleAutomateClick = () => {
    if (mode === 'normal') {
      setMode('automating');
    }
    else {
      setMode('normal');
    }
    props.onAutomate();
  }
  
  
  return (
    <div className="Controls">
      <button disabled={ mode === 'generate' } onClick={ props.onAdvance }>
        Step
      </button>

      <button disabled={ mode === 'generate' } onClick={ props.onReset }>
        Restart
      </button>

      <button disabled={ mode === 'generate' } onClick={ handleAutomateClick }>
        { autoText }
      </button>

      <button disabled={ mode === 'automating' } onClick={ handleGenerateClick }>
        { genText }
      </button>

      {
        mode === 'generate' &&
        <div className="generate-form">
          <label>
            X:
            <input type="number" value={ x } onChange={ e => handleInputChange(parseInt(e.target.value), y) } />
          </label>

          <label>
            Y:
            <input type="number" value={ y } onChange={ e => handleInputChange(x, parseInt(e.target.value)) } />
          </label>
        </div>
      }
    </div>
  );
}
export default Controls;