import React from "react";
import { css } from "../../styled-system/css";
import ThemeColor from "../types/ThemeColor";

interface ColorInputCircleProps {
  color: ThemeColor;
  onClick: () => void;
}

const ColorInputCircle: React.FC<ColorInputCircleProps> = ({
  color,
  onClick,
}) => {
  return (
    <label
      htmlFor="file-input"
      style={{
        backgroundColor: color.ColorCode,
      }}
      className={css({
        w: "150px",
        h: "150px",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      })}
      onClick={onClick}
    >
      <img src="/camera.svg" alt="カメラ" />
    </label>
  );
};

export default ColorInputCircle;
