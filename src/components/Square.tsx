import * as React from 'react';
import { ReactText } from 'react';

type SquareProps = {
  onClick: () => void;
  value: ReactText;
};

export const Square = (props: SquareProps): JSX.Element => {
  return (
    <button type="button" className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};
