import React from "react";
import { css } from "../../styled-system/css";

interface ExplainItemProps {
  id: string;
  text: string;
  iconPath: string;
  isMobile?: boolean;
  alt: string;
}

const ExplainItem: React.FC<ExplainItemProps> = ({
  id,
  text,
  iconPath,
  isMobile,
  alt,
}) => {
  return (
    <li
      className={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: isMobile ? "0" : "10px",
      })}
    >
      <img
        id={id}
        src={iconPath}
        alt={alt}
        className={css({
          h: isMobile ? "100px" : "160px",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.2)",
          },
        })}
      />
      <label
        htmlFor={id}
        className={css({
          fontSize: isMobile ? "1rem" : "1.2rem",
          color: "var(--secondary)",
        })}
      >
        {text}
      </label>
    </li>
  );
};

export default ExplainItem;
