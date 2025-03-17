import { useState } from "react";
import Header from "./components/Header";
import { HeaderMode } from "./types/HeaderMode";
import reactLogo from "./assets/react.svg";
import { css } from "../styled-system/css";
import { flex } from "../styled-system/patterns";
import { useParams } from "react-router-dom";
import Button from "./components/Button";
import { ButtonMode } from "./types/ButtonMode";
import QRCode from "./components/qrcode";
// import BoxBorderedContainerWithTitle from "./components/BoxBorderedContainerWithTitle";

export function Rooms() {
  const { roomId } = useParams<{ roomId: string }>();
  const [members] = useState<string[]>([
    "こた",
    "たいち",
    "ゆうか",
    "しょうま",
    "ああああああ",
    "jeofjeofjeofj",
  ]);
  const [url] = useState<string>(
    `http://localhost:9000/PicoloR-frontend-farm/room/${roomId}`
  );

  return (
    <>
      <Header mode={HeaderMode.GREEN} />
      <div
        className={css({
          mt: "90px",
        })}
      >
        <h1
          className={flex({
            display: "flex",
            justify: "center",
            fontSize: "2.5rem",
            fontFamily: "M PLUS 1p",
            color: "#4A4747",
          })}
        >
          スマホでQRを読み取って参加しよう！
        </h1>
        <div
          className={flex({
            display: "flex",
            w: "100%",
            justify: "center",
            mt: "25px",
          })}
        >
          <div
            className={flex({
              display: "flex",
              justify: "center",
              align: "center",
              mt: "20px",
              w: "40%",
              h: "100%",
            })}
          >
            <QRCode url={url} />
          </div>
          <div
            className={flex({
              width: "40%",
            })}
          >
            {/* <BoxBorderedContainerWithTitle title="参加者一覧">
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
            </BoxBorderedContainerWithTitle> */}
          </div>
        </div>
        <div
          className={flex({
            display: "flex",
            justify: "center",
            m: "0 auto",
            mt: "20px",
            w: "480px",
            h: "83px",
          })}
        >
          <Button type={ButtonMode.GREEN} text="GAME START" />
        </div>
      </div>
    </>
  );
}
