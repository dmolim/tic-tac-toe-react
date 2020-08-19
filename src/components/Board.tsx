import { ReactNode, ReactText } from 'react';
import * as React from 'react';
import { Square } from './Square';

export type Square = ReactText;

export type Squares = Square[];

type BoardProps = {
  squares: Squares;
  onClick: (i: number) => void;
};

type BoardState = {
  boardSize: number;
};

export class Board extends React.Component<BoardProps, BoardState> {
  constructor(props: BoardProps) {
    super(props);
    this.state = {
      boardSize: 3,
    };
  }

  renderSquare(i: number): JSX.Element {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render(): ReactNode {
    const boardRows = [];

    for (let i = 0; i < this.state.boardSize; i++) {
      const squares = [];

      for (let j = 0; j < this.state.boardSize; j++) {
        squares.push(this.renderSquare(i * 3 + j));
      }

      boardRows.push(<div className="board-row">{squares}</div>);
    }

    return <div>{boardRows}</div>;
  }
}
