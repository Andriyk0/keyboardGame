import React, { useEffect, useState } from 'react';
import './App.scss';

export const App: React.FC = () => {
  const [start, setStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState<number>(0);
  const [keyDownLetter, setKeyDownLetter] = useState<string>('');
  const [shiftLetter, setShiftLetter] = useState<string | undefined>('0');
  const letterArr = ['', 'j', 'a', 'v', 'A', 's', 'c', 'r', 'i', 'p', 't'];

  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      setKeyDownLetter(event.key);
    });
  }, []);

  useEffect(() => {
    if (keyDownLetter === shiftLetter && shiftLetter === 'A') {
      setScore(score * 2);
    } else if (keyDownLetter === shiftLetter) {
      setScore(score + 1);
    }
  }, [shiftLetter]);

  const func = () => {
    setShiftLetter(letterArr.shift());
  };

  const startGame = () => {
    setStart(true);
    setGameOver(false);
    setScore(0);

    setTimeout(() => {
      const timer = setInterval(func, 2000);

      setTimeout(() => {
        clearInterval(timer);
        setStart(false);
        setGameOver(true);
      }, 22000);
    }, 3000);
  };

  return (
    <div className="game">
      <div className="game__container">
        <div className="game__score">
          {
            start
              ? (
                <div className="game__info">
                  <p>Try to catch the letter !!!</p>
                  <p>Press the keyboard !!!</p>
                </div>
              )
              : <h1 className="game__title">Keyboard GAME</h1>
          }
        </div>
        <div className="game__start">
          {
            gameOver && (
              <>
                <p className="game__over">Game over</p>
                <p className="game__over-score">{`Your score: ${score}`}</p>
              </>
            )
          }
          {
            !start && (
              <button
                type="button"
                className="game__start-button"
                onClick={startGame}
              >
                Start
              </button>
            )
          }
          {
            start && (
              <p className="count"></p>
            )
          }
        </div>
      </div>
      {
        start && (
          letterArr.map(item => (
            <p key={item} className={`letter ${item}`}>{item}</p>
          ))
        )
      }
    </div>
  );
};
