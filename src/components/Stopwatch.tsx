import React from "react";

interface StopwatchDisplayProps {
  time: number;
}

const Stopwatch: React.FC<StopwatchDisplayProps> = ({ time }) => {
  return (
    <div
      style={{
        fontSize: "3rem",
        textAlign: "center",
        marginTop: "2rem",
      }}
    >
      {time}s
    </div>
  );
};

export default Stopwatch;
