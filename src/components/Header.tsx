import React from "react";
import "../../styled-system/styles.css";
import type { HeaderProps } from "../types/HeaderMode";
import { HeaderMode } from "../types/HeaderMode";

const Header: React.FC<HeaderProps> = ({ mode }) => {
  if (mode === HeaderMode.NONE) {
    return null;
  }
  const modeClass = mode === HeaderMode.GREEN ? "green" : "gray";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Londrina+Solid&display=swap');

        .header {
          font-size: 4rem;
          padding: 1rem;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          display: flex;
          font-family: 'Londrina Solid', sans-serif;
        }

        /* 後ろ側の黒文字 */
        .header .black-text {
          color: black;
        }

        /* 前景の緑文字（上にずらして重ねる） */
        .header .colored-text {
          position: absolute;
          top: -4px;
          left: -4px;
        }

        /* 緑パターン */
        .header.green .colored-text {
          color: #00b050;
        }

        /* グレーパターン */
        .header.gray .colored-text {
          color: gray;
        }
      `}</style>

      <h1 className={`header ${modeClass}`}>
        <span className="black-text">PiColor</span>
        <span className="colored-text">PiColor</span>
      </h1>
    </>
  );
};

export default Header;
