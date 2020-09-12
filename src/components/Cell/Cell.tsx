import React from 'react';

import './Cell.css';


type CellProps = {
  alive: boolean,
  size: number,
}


const Cell:React.FC<CellProps> = (props) => {
  const { alive, size } = props;
  const className = `Cell ${alive ? 'alive' : 'dead'}`; 
  const style = {
    width: size,
    height: size,
  };

  return (
    <div className={ className } style={ style } />
  );
}
export default Cell;