import React, { useState, useRef, useEffect } from "react";

export default function SimpleTimer() {
  const [seconds, setSeconds] = useState(10);
  const [minutes, setMinutes] = useState(2);
  const timer = useRef;

  useEffect(() => {
    timer.current = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    if (seconds === 0) clearInterval(timer.current);
    return () => clearInterval(timer.current);
  });
  return <h1>{seconds}</h1>;
}
