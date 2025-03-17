import { Button, ConfigProvider, Form, Input } from "antd";
import type { FormProps } from "antd";
import { css } from "../styled-system/css";
import Header from "./components/Header";
import { HeaderMode } from "./types/HeaderMode";
import { createStyles } from "antd-style";
import { CONTROLLER_PLAYING_MODE } from "./const";
import { useState } from "react";
import ControllerPlayingWaiting from "./ControllerPlayingWaiting";
import ControllerPlayingPlaying from "./ControllerPlayingPlaying";
import UserName from "./UserName";

export function ControllerPlaying() {
  const url = new URL(window.location.href);
  const roomID = url.searchParams.get("roomID");
  const roomIDNum = Number(roomID);
  const userID = url.searchParams.get("userID");
  console.log("roomID: ", roomID, ", userID: ", userID);
  const [currentMode, setCurrentMode] = useState<CONTROLLER_PLAYING_MODE>(
    CONTROLLER_PLAYING_MODE.PLAYING
  );

  if (!roomID) {
    return (
      <main
        className={css({
          h: "100dvh",
          w: "100dvw",
          p: "10px 30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        })}
      >
        <Header mode={HeaderMode.GREEN} />

        <p
          className={css({
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "red",
            textAlign: "center",
          })}
        >
          roomID が存在しません。
          <br />
          正しい画面に接続してください。
        </p>
      </main>
    );
  }

  if (!userID) {
    return (
      <main
        className={css({
          h: "100dvh",
          w: "100dvw",
          p: "10px 30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        })}
      >
        <Header mode={HeaderMode.GREEN} />

        <p
          className={css({
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "red",
            textAlign: "center",
          })}
        >
          userID が存在しません。
          <br />
          正しい画面に接続してください。
        </p>
      </main>
    );
  }

  return (
    <main
      className={css({
        h: "100dvh",
        w: "100dvw",
        p: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      })}
    >
      <Header mode={HeaderMode.GREEN} />
      {/* currentModeによって切り替える */}
      {currentMode === CONTROLLER_PLAYING_MODE.WAITING && (
        <ControllerPlayingWaiting />
      )}
      {currentMode === CONTROLLER_PLAYING_MODE.PLAYING && (
        <ControllerPlayingPlaying />
      )}
      {currentMode === CONTROLLER_PLAYING_MODE.CLEARED && (
        <div>
          <h1>CLEARED</h1>
        </div>
      )}
      {currentMode === CONTROLLER_PLAYING_MODE.FINISHED && (
        <div>
          <h1>FINISHED</h1>
        </div>
      )}

      <UserName userName={userID} />
    </main>
  );
}
