import React, { useState, useRef, useEffect } from "react";
import "./App.css";

// import "./App.scss";
import Button from "react-bootstrap/Button";

export default function Test() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(2);
  const [paused, setPaused] = useState(true);
  const [breakTime, setBreakTime] = useState(false);

  const resetButtonColor = useRef("outline-info");
  const timer = useRef();
  const hello = "disabled";

  const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const handleClick = () => {
    if (!paused) {
      clearInterval(timer.current);
    }
    resetButtonColor.current = "info";
    setPaused(!paused);
  };

  const handleReset = () => {
    clearInterval(timer.current);
    setPaused(true);
    setBreakTime(false);
    setSeconds(0);
    setMinutes(2);
    resetButtonColor.current = "outline-info";
  };

  useEffect(() => {
    if (paused === false) {
      if (seconds < 0 && minutes > 0) {
        setSeconds(10);
        setMinutes((minutes) => minutes - 1);
      }
      timer.current = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    }
    if (seconds === 0 && minutes === 0) {
      setPaused(true);
      clearInterval(timer.current);
      if (breakTime === false) {
        setBreakTime(true);
        setSeconds(0);
        setMinutes(1);
      } else {
        setBreakTime(false);
        setMinutes(2);
        resetButtonColor.current = "outline-info";
      }
    }
    return () => clearInterval(timer.current);
  }, [paused, breakTime, minutes, seconds]);

  return (
    <>
      <div className="inner">
        <h1 className="title">Pomodoro Timer</h1>
        <p className="timer">
          {displayMinutes}:{displaySeconds}
        </p>
        <div className="d-flex justify-content-center gap-5">
          <Button variant="warning" size="lg" onClick={handleClick}>
            {(paused && <div>start</div>) || (!paused && <div>pause</div>)}
          </Button>
          <Button
            variant="danger"
            disabled={minutes === 2}
            onClick={handleReset}
          >
            reset
          </Button>
        </div>

        {breakTime && <div>it's break time</div>}
      </div>
    </>
  );
}
