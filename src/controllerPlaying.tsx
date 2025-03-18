import { css } from "../styled-system/css";
import Header from "./components/Header";
import { HeaderMode } from "./types/HeaderMode";
import { CONTROLLER_PLAYING_MODE } from "./types/ControllerPlayingMode";
import { useEffect, useState } from "react";
import ControllerPlayingWaiting from "./ControllerPlayingWaiting";
import ControllerPlayingPlaying from "./ControllerPlayingPlaying";
import UserName from "./UserName";
import { supabase } from "./supabase/supabase";
import ThemeColor, { ThemeColorsWithIsPosted } from "./types/ThemeColor";
import LoadingModal from "./components/Loading";
import ControllerPlayingCleared from "./ControllerPlayingCleared";
import Post from "./types/Post";

export function ControllerPlaying() {
  const [currentMode, setCurrentMode] = useState<CONTROLLER_PLAYING_MODE>(
    CONTROLLER_PLAYING_MODE.WAITING
  );
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [themeColors, setThemeColors] = useState<
    ThemeColorsWithIsPosted[] | null
  >(null);
  const [userName, setUserName] = useState<string | null>(null);

  const url = new URL(window.location.href);
  const roomID = url.searchParams.get("roomID");
  const roomIDNum = Number(roomID);
  const userID = url.searchParams.get("userID");

  async function getPost() {
    const { data: fetchedPost, error } = await supabase
      .from("posts")
      .select(
        `
        room_colors(color),
        rank,
        image
      `
      )
      .eq("room_id", roomID)
      .eq("user_id", userID)
      .single();

    if (error) {
      console.error(error);
      return false;
    }
    if (!fetchedPost) {
      console.error("data is null");
      return false;
    }
    setPost({
      // @ts-ignore
      colorCode: fetchedPost.room_colors.color,
      rank: fetchedPost.rank,
      imagePath: `data:image/jpeg;base64,${fetchedPost.image}`,
    });
  }

  async function getIsCleared() {
    const { data: fetchedPost, error } = await supabase
      .from("posts")
      .select("color_id, user_id")
      .eq("room_id", roomIDNum);
    if (error) {
      console.error("error", error);
      return null;
    }
    if (!fetchedPost) {
      console.error("data is null");
      return null;
    }

    const isPosted =
      userID &&
      fetchedPost.some(
        (post: { color_id: number; user_id: number }) =>
          `${post.user_id}` === userID
      );

    if (isPosted) {
      await getPost();
    }

    return fetchedPost;
  }

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
    const fetchedThemeColors = data.themeColors;

    const fetchedPost = await getIsCleared();

    if (!fetchedPost) {
      return;
    }

    const fetchedThemeColorsWithIsPosted = fetchedThemeColors.map(
      (themeColor: ThemeColor) => {
        const isPosted = fetchedPost.some(
          (post: { color_id: number }) => post.color_id === themeColor.ColorId
        );
        return { ...themeColor, isPosted };
      }
    );
    setThemeColors([...fetchedThemeColorsWithIsPosted]);
  }

  useEffect(() => {
    const roomsChannel = supabase
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
                case post !== null:
                  break;
                case isFinish:
                  setCurrentMode(CONTROLLER_PLAYING_MODE.FINISHED);
                  await getIsCleared();
                  break;
                case isStart:
                  if (currentMode === CONTROLLER_PLAYING_MODE.WAITING) {
                    await getThemeColors();
                  }
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

    const postsChannel = supabase
      .channel("table_posts_db_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "posts",
        },
        async (payload) => {
          console.log("payload", payload);
          if (payload.eventType === "INSERT") {
            if (payload.new?.room_id === roomIDNum) {
              if (!themeColors) {
                return;
              }
              setThemeColors((prevThemeColors) => {
                if (!prevThemeColors) {
                  return prevThemeColors;
                }
                return prevThemeColors.map((themeColor) => {
                  if (themeColor.ColorId === payload.new?.color_id) {
                    return { ...themeColor, isPosted: true };
                  }
                  return themeColor;
                });
              });
            }
          }
        }
      )
      .subscribe();

    return () => {
      roomsChannel.unsubscribe();
      postsChannel.unsubscribe();
    };
  }, []);

  useEffect(() => {
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
      const isStart = data[0].is_start;
      const isFinish = data[0].is_finish;
      switch (true) {
        case isFinish:
          setCurrentMode(CONTROLLER_PLAYING_MODE.FINISHED);
          await getIsCleared();
          break;
        case isStart:
          await getThemeColors();
          setCurrentMode(CONTROLLER_PLAYING_MODE.PLAYING);
          break;
        default:
          setCurrentMode(CONTROLLER_PLAYING_MODE.WAITING);
          break;
      }
    };
    const userNameFetch = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("name")
        .eq("id", userID)
        .single();
      if (error) {
        console.error("error", error);
        return;
      }
      if (!data) {
        console.error("data is null");
        return;
      }
      setUserName(data.name);
    };

    const firstFetch = async () => {
      await getCurrentPlayingMode();
      await userNameFetch();

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
  if (currentMode === CONTROLLER_PLAYING_MODE.WAITING) {
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

        <ControllerPlayingWaiting />
        <UserName userName={userName || "unknown controller"} />
      </main>
    );
  }

  if (post) {
    return (
      <main
        style={{
          background: post.colorCode,
        }}
        className={css({
          h: "100dvh",
          w: "100dvw",
          p: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          overflow: "hidden",
        })}
      >
        <Header mode={HeaderMode.GRAY} />
        <ControllerPlayingCleared post={post} />
        <UserName userName={userName || "unknown controller"} />
      </main>
    );
  }

  if (currentMode === CONTROLLER_PLAYING_MODE.FINISHED) {
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
        <Header mode={HeaderMode.GRAY} />
        <p
          className={css({
            fontSize: "4rem",
            fontWeight: "bold",
            color: "var(--dark)",
            WebkitTextStroke: "1px var(--secondary)",
          })}
        >
          LOSE
        </p>
        <UserName userName={userName || "unknown controller"} />
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
      <Header mode={HeaderMode.GRAY} />
      <ControllerPlayingPlaying themeColors={themeColors} />

      <UserName userName={userName || "unknown controller"} />
    </main>
  );
}
