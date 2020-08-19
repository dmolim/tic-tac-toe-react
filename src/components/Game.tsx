import * as React from 'react';
import { ReactNode } from 'react';
import { Board, Square, Squares } from './Board';

type GameProps = {};

type HistoryItem = { squares: Squares };

type GameState = {
  squares: Squares;
  xIsNext: boolean;
  history: HistoryItem[];
  stepNumber: number;
};

function calculateWinner(squares: Squares): Square | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export class Game extends React.Component<GameProps, GameState> {
  private initialSquaresArray = Array(9).fill(null);

  constructor(props: GameProps) {
    super(props);
    this.state = {
      squares: this.initialSquaresArray,
      history: [
        {
          squares: this.initialSquaresArray,
        },
      ],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick(i: number): void {
    if (calculateWinner(this.state.squares) || this.state.squares[i]) {
      return;
    }

    this.setState((prevState: GameState) => {
      const history = prevState.history.slice(0, prevState.stepNumber + 1);
      const current = history[history.length - 1];
      const squares: Squares = [...current.squares];

      squares[i] = prevState.xIsNext ? 'X' : 'O';

      return {
        squares,
        history: [...history, { squares }],
        stepNumber: history.length,
        xIsNext: !prevState.xIsNext,
      };
    });
  }

  jumpTo(step: number): void {
    this.setState(() => ({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    }));

    if (!step) {
      this.setState((prevState: GameState) => ({
        squares: prevState.history[0].squares,
        history: prevState.history.slice(0, 1),
      }));
    }
  }

  render(): ReactNode {
    const { history } = this.state;
    const current = history[this.state.stepNumber];

    const winner: Square | null = calculateWinner(this.state.squares);
    let status: string;
    if (winner) {
      status = `Winner is ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    const moves: JSX.Element[] = this.state.history.map((step, move) => {
      const desc = move ? `Move to the step #${move}` : 'Move to start';

      return (
        // eslint-disable-next-line react/no-array-index-key
        <li key={move}>
          <button type="button" onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
