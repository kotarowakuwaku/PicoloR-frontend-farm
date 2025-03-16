import React from "react";
import { css } from "../../styled-system/css";

interface ExplainItemProps {
  id: string;
  text: string;
  iconPath: string;
  alt: string;
}

const ExplainItem: React.FC<ExplainItemProps> = ({
  id,
  text,
  iconPath,
  alt,
}) => {
  return (
    <li
      className={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      })}
    >
      <img
        id={id}
        src={iconPath}
        alt={alt}
        className={css({
          h: "160px",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.2)",
          },
        })}
      />
      <label
        htmlFor={id}
        className={css({
          fontSize: "1.2rem",
          color: "var(--primary)",
        })}
      >
        {text}
      </label>
    </li>
  );
};

export default ExplainItem;
