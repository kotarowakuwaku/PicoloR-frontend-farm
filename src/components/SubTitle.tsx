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
        marginBottom: "2rem",
        fontSize: "2rem",
      })}
    >
      {title}
    </div>
  );
};
