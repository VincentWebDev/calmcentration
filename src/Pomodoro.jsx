import React, { useState, useRef, useEffect } from "react";

import sound from "./assets/woodwind-instrument.mp3";
import "./App.css";

import { Badge, Button, Container, Row, Col } from "react-bootstrap";

export default function Test() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(1);
  const [paused, setPaused] = useState(true);
  const [breakTime, setBreakTime] = useState(false);

  const timer = useRef();

  const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const breakTimeAudio = new Audio(sound);

  const handleClick = () => {
    if (!paused) {
      clearInterval(timer.current);
    }
    setPaused(!paused);
  };

  const handleReset = () => {
    clearInterval(timer.current);
    setPaused(true);
    setBreakTime(false);
    setSeconds(0);
    setMinutes(25);
  };

  useEffect(() => {
    if (paused === false) {
      if (seconds < 0 && minutes > 0) {
        setSeconds(59);
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
        breakTimeAudio.play();
        setSeconds(0);
        setMinutes(5);
      } else {
        setBreakTime(false);
        breakTimeAudio.play();
        setMinutes(25);
      }
    }
    return () => clearInterval(timer.current);
  }, [paused, breakTime, minutes, seconds]);

  return (
    <Container className="bg-primary rounded d-flex justify-content-center">
      <Row className="d-flex justify-content-center">
        <Col>
          <h1 className="display-1 pt-5 text-center">Pomodoro Timer</h1>
          <p className="display-2 fw-bold d-flex justify-content-center">
            {displayMinutes}:{displaySeconds}
          </p>
          {/* NEED TO CORRECT THE GAP BETWEEN THE BUTTONS DESKTOP/MOBILE */}
          <Row className="text-center gap-2">
            <Col>
              <Button variant="warning" onClick={handleClick}>
                {(paused && <div>start</div>) || (!paused && <div>pause</div>)}
              </Button>
            </Col>
            <Col>
              <Button
                variant="warning"
                disabled={minutes === 25}
                onClick={handleReset}
              >
                reset
              </Button>
            </Col>
          </Row>

          <h5
            className="d-flex justify-content-center py-4"
            style={{ visibility: `${breakTime ? "visible" : "hidden"}` }}
          >
            <Badge bg="secondary">It's Break Time</Badge>
          </h5>
        </Col>
      </Row>
    </Container>
  );
}
