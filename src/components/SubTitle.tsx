import React from "react";
import { css } from "../../styled-system/css";

interface ThemeColorTitleProps {
  title: string;
}

export const SubPageTitle: React.FC<ThemeColorTitleProps> = ({ title }) => {
  return (
    <div
      className={css({
        display: "flex",
        width: "100vw",
        justifyContent: "center",
        height: "70vh",

        textAlign: "center",
        fontSize: "2rem",
      })}
    >
      {title}
    </div>
  );
};
