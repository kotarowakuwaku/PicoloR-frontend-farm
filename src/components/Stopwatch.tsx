import React from "react";

interface StopwatchDisplayProps {
  time: number;
}

const Stopwatch: React.FC<StopwatchDisplayProps> = ({ time }) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div
      style={{
        fontSize: "3rem",
        textAlign: "center",
        marginTop: "2rem",
      }}
    >
      {time >= 60 ? `${minutes}:${seconds}` : `${time}`}
    </div>
  );
};

export default Stopwatch;
