import React from 'react';
import ReactDOM from 'react-dom';
import { TOAD } from 'patterns';
import { calculateGrid } from 'lib/utils';


const _ = false;
const O = true;
export const TOAD_GEN_1:boolean[][] = [
  [_, _, _, _, _, _],
  [_, _, _, _, _, _],
  [_, _, O, O, O, _],
  [_, O, O, O, _, _],
  [_, _, _, _, _, _],
  [_, _, _, _, _, _],
];

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });



it('calculates the next grid correctly', () => {
  expect(calculateGrid(TOAD)).toStrictEqual(TOAD_GEN_1);
  expect(calculateGrid(TOAD_GEN_1)).toStrictEqual(TOAD);
  expect(calculateGrid([])).toStrictEqual([]);
});