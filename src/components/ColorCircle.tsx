import React from "react";
import { css } from "../../styled-system/css";

interface ColorCircleProps {
  color: string;
}

export const ColorCircle: React.FC<ColorCircleProps> = ({ color }) => {
  console.log(css({ bg: color }));
  return (
    <div
      //TODO(Taichi): パンダcssで適用する
      // className={css({
      //   display: "flex",
      //   width: "100px",
      //   height: "100px",
      //   borderRadius: "50%",
      //   backgroundColor: `[${color}]`,
      //   boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
      //   border: "1px solid ",

      // })}
      style={{
        display: "flex",
        width: "20vw",
        height: "20vw",
        borderRadius: "50%",
        backgroundColor: color,
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
        border: `1px solid ${color}`,
      }}
    ></div>
  );
};
