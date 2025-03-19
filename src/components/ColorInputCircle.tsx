import React from "react";
import { css } from "../../styled-system/css";
import { ThemeColorsWithIsPosted } from "../types/ThemeColor";
import verifyed from "../assets/verified.svg";
import camera from "../assets/camera.svg";

interface ColorInputCircleProps {
  color: ThemeColorsWithIsPosted;
  onClick: () => void;
}

const ColorInputCircle: React.FC<ColorInputCircleProps> = ({
  color,
  onClick,
}) => {
  console.log(color.ColorCode);
  return (
    <label
      htmlFor={color.isPosted ? undefined : "file-input"}
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
        opacity: color.isPosted ? 0.5 : 1,
        filter: color.isPosted ? "saturate(0.5)" : "saturate(1)",
        boxShadow: "0 8px 8px rgba(0,0,0,0.25)",
        transition: "all 0.3s",
      })}
      onClick={color.isPosted ? undefined : onClick}
      aria-disabled={color.isPosted}
    >
      <img
        className={css({
          w: "60%",
          h: "60%",
        })}
        src={color.isPosted ? verifyed : camera}
        alt="カメラ"
      />
    </label>
  );
};

export default ColorInputCircle;
