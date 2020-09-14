import React from 'react';

import './Cell.css';


type CellProps = {
  alive: boolean,
  size: number,
  selectable?: boolean,
  onClick?: () => void,
}


const Cell:React.FC<CellProps> = (props) => {
  const { alive, size, selectable } = props;
  const className = `Cell ${alive ? 'alive' : 'dead'} ${selectable ? 'selectable' : ''}`; 
  const style = {
    width: size,
    height: size,
  };


  const handleClick = () => {
    if (props.selectable && props.onClick) {
      props.onClick();
    }
  }

  return (
    <div className={ className } style={ style } onClick={ handleClick } />
  );
}
export default Cell;