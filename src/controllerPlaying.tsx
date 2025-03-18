import { css } from "../styled-system/css";
import Header from "./components/Header";
import { HeaderMode } from "./types/HeaderMode";
import { CONTROLLER_PLAYING_MODE } from "./types/ControllerPlayingMode";
import { useEffect, useState } from "react";
import ControllerPlayingWaiting from "./ControllerPlayingWaiting";
import ControllerPlayingPlaying from "./ControllerPlayingPlaying";
import UserName from "./UserName";
import { supabase } from "./supabase/supabase";
import ThemeColor from "./types/ThemeColor";
import LoadingModal from "./components/Loading";

export function ControllerPlaying() {
  const [currentMode, setCurrentMode] = useState<CONTROLLER_PLAYING_MODE>(
    CONTROLLER_PLAYING_MODE.WAITING
  );
  const [isLoading, setIsLoading] = useState(true);
  const [themeColors, setThemeColors] = useState<ThemeColor[] | null>(null);
  console.log("themeColors", themeColors);
  const url = new URL(window.location.href);
  const roomID = url.searchParams.get("roomID");
  const roomIDNum = Number(roomID);
  const userID = url.searchParams.get("userID");

  useEffect(() => {
    const channel = supabase
      .channel("table_rooms_db_changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "rooms",
        },
        async (payload) => {
          console.log(payload);
          if (payload.eventType === "UPDATE") {
            if (payload.new?.id === roomIDNum) {
              const isStart = payload.new?.is_start;
              const isFinish = payload.new?.is_finish;
              switch (true) {
                case isFinish:
                  window.location.href = `/result?roomID=${roomID}&userID=${userID}`;
                  break;
                case isStart:
                  setCurrentMode(CONTROLLER_PLAYING_MODE.PLAYING);
                  break;
                default:
                  setCurrentMode(CONTROLLER_PLAYING_MODE.WAITING);
                  break;
              }
            }
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    async function getThemeColors() {
      const res = await fetch(
        `https://picolor-backend-go.onrender.com/controller/colors?roomID=${roomID}`,
        {
          method: "GET",
        }
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
      setThemeColors(data.themeColors);
    }
    const getCurrentPlayingMode = async () => {
      const { data, error } = await supabase
        .from("rooms")
        .select("is_start, is_finish")
        .eq("id", roomIDNum);
      if (error) {
        console.error("error", error);
        return;
      }
      if (!data) {
        console.error("data is null");
        return;
      }
      console.log(data);
      const isStart = data[0].is_start;
      const isFinish = data[0].is_finish;
      switch (true) {
        case isFinish:
          window.location.href = `/result?roomID=${roomID}&userID=${userID}`;
          break;
        case isStart:
          setCurrentMode(CONTROLLER_PLAYING_MODE.PLAYING);
          break;
        default:
          setCurrentMode(CONTROLLER_PLAYING_MODE.WAITING);
          break;
      }
    };

    const firstFetch = async () => {
      await getThemeColors();
      await getCurrentPlayingMode();
      setIsLoading(false);
    };

    firstFetch();
  }, []);

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

  if (isLoading) {
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

        <LoadingModal />
      </main>
    );
  }

  if (!themeColors || themeColors.length === 0) {
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
          テーマカラーが取得できませんでした。
          <br />
          もう一度接続してください。
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
        <ControllerPlayingPlaying themeColors={themeColors} />
      )}

      <UserName userName={userID} />
    </main>
  );
}
