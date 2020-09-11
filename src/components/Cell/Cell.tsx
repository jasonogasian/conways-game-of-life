import React from 'react';

import './Cell.css';


type CellProps = {
  alive: boolean,
}


const Cell:React.FC<CellProps> = (props) => {
  const { alive } = props;
  const className = `Cell ${alive ? 'alive' : 'dead'}`; 

  return (
    <div className={ className } />
  );
}
export default Cell;