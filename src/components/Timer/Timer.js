import React, { useState, useEffect } from "react";
import "./Timer.css";
import PropTypes from "prop-types";
import {
  PlayCircleFilled,
  PauseCircleFilled,
  StepBackwardFilled,
} from "@ant-design/icons";
import { duration } from "../../workers/time";

const Timer = ({ isItemCompleted }) => {
  const INTERVAL = 1000;

  const [timerState, setTimerState] = useState({
    isPaused: true,
    isActive: false,
  });

  const [taskDuration, setTaskDuration] = useState(0);

  const toggleTimerMode = (e) => {
    if (!isItemCompleted) {
      // eslint-disable-next-line no-unused-expressions
      e.currentTarget.classList.contains("play-icon")
        ? setTimerState({ isPaused: false, isActive: true })
        : setTimerState({ isPaused: true, isActive: false });
    }
    return null;
  };

  const { isPaused, isActive } = timerState;
  const button = isPaused ? (
    <PlayCircleFilled
      className="play-icon"
      onClick={(e) => toggleTimerMode(e)}
    />
  ) : (
    <PauseCircleFilled
      className="pause-icon"
      onClick={(e) => toggleTimerMode(e)}
    />
  );

  useEffect(() => {
    if (isItemCompleted) setTimerState({ isPaused: true, isActive: false });
  }, [isItemCompleted]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const start = new Date();
    if (isActive) {
      const timerId = setInterval(() => {
        const now = new Date();
        const interval = now - start;
        const currentTime = taskDuration + interval;
        setTaskDuration(currentTime);
      }, INTERVAL);
      return () => clearInterval(timerId);
    }
  }, [isActive, taskDuration]);

  const resetTimer = () => {
    if (!isItemCompleted) {
      setTimerState({ isPaused: true, isActive: false });
      setTaskDuration(0);
    }
  };

  const time = duration(taskDuration);
  const disabled = isItemCompleted ? "disabled" : "";
  return (
    <div className={`timer ${disabled}`}>
      <span className="timer-value">{time}</span>
      {button}
      <StepBackwardFilled onClick={resetTimer} className="clear-icon" />
    </div>
  );
};

Timer.propTypes = {
  isItemCompleted: PropTypes.bool.isRequired,
};

export default Timer;
