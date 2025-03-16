import { useState } from "react";
import Header from "./components/Header";
import { HeaderMode } from "./types/HeaderMode";
import reactLogo from "./assets/react.svg";
import { css } from "../styled-system/css";
import { flex } from "../styled-system/patterns";
import { useParams } from "react-router-dom";

export function Rooms() {
  const { roomId } = useParams<{ roomId : string }>();
  const [members, ] = useState<string[]>(["こた", "たいち", "ゆうか", "しょうま", "ああああああ", "jeofjeofjeofj"])

  return (
    <>
      <Header mode={HeaderMode.GREEN} />
      <div className={css({
        mt: "90px"
      })}>
        <h1 className={flex({
          display: "flex",
          justify: "center",
          fontSize: "2.5rem",
          fontFamily: "M PLUS 1p",
          color: "#4A4747"
        })}>スマホでQRを読み取って参加しよう！</h1>
        <div className={flex({
          display: "flex",
          w: "100%",
          justify: "center",
          mt: "25px"
        })}>
          <div className={css({
            w: "40%"
          })}>
            <img src={reactLogo} alt=""
              className={css({
                w: "60%"
              })}
            />
          </div>
          <div className={css({
            border: "2px solid #2E2E2E",
            borderRadius: "20px",
            w: "40%",
            h: "50vh"
          })}>
            <div className={flex({
              display: "flex",
              justify: "center",
              fontSize: "1.5rem"
            })}>参加者一覧</div>
            {members && (
              <div className={flex({
                display: "flex",
                justify: "center",
                fontSize: "3rem"
              })}>
                {members.length}人
              </div>
            )}
            <ul className={flex({
              p: "5px 20px",
              display: "flex",
              flexWrap: "wrap",
              listStyle: "none"
            })}>
              {members && (
                members.map((member) => (
                  <li key={member} className={css({
                    display: "inline",
                    p: "5px 20px",
                    fontSize: "1rem"
                  })}>
                    {member}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className={flex({
          display: "flex",
          justify: "center",
          m: "0 auto",
          mt: "20px",
          w: "480px",
          h: "80px",

        })}>
          <button type="button" className={css({ border: "1px solid black", w: "100%" })}>GAME START</button>
        </div>
      </div>
    </>
  );
}
