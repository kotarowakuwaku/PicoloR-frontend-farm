import { useState, useEffect } from "react";
import { css } from "../styled-system/css";
import { HeaderMode } from "./types/HeaderMode";
import Header from "./components/Header";
import CountDownModal from "./components/CountdownModal";
import { SubPageTitle } from "./components/SubTitle";
import { ColorCircle } from "./components/ColorCircle";
import Stopwatch from "./components/Stopwatch";
import useCountdown from "./hooks/useCountdown";
import useStopwatch from "./hooks/useStopwatch";
import { supabase } from "./supabase/supabase";
import { data } from "react-router-dom";
import { useParams } from "react-router-dom";
import { PostedResult } from "./components/PostedResult";

export function GameHost() {
  const [modalVisible, setModalVisible] = useState(false);
  const [stopwatchVisible, setStopwatchVisible] = useState(false);
  const { roomId } = useParams<{ roomId: string }>();
  const [themeColors, setThemeColors] = useState<ColorObj[]>([]);
  const [imageURL, setImageURL] = useState<string>();
  const [payloadNew, setPayloadNew] = useState<PayloadNew[]>([]);
  const [posetedname, setPostedName] = useState<
    | [
        {
          name: string;
          user_id: number;
        }
      ]
    | []
  >([]);

  const functionAfterModalCountdown = () => {
    setModalVisible(false);
    setStopwatchVisible(true);
    stopwatch.start();
    handlestart();
  };

  const { count, startCountdown } = useCountdown(functionAfterModalCountdown);

  type ColorObj = {
    ColorId: number;
    ColorCode: string;
  };

  type PayloadNew = {
    color_id: number;
    image: string;
    rank: number;
    room_id: number;
    user_id: number;
    posted_time: string;
  };

  const stopwatch = useStopwatch();
  console.log("themeColors", themeColors);

  const handlestart = async () => {
    const timestampz = new Date();
    console.log("timestampz", timestampz);
    try {
      const response = await fetch(
        `https://picolor-backend-go.onrender.com//host/room/start`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomID: Number(roomId),
            startTime: timestampz,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching theme colors:", error);
    }
  };
  // useEffect(() => {
  //   const fetchPostedName = async (userId: number) => {
  //     const { data, error } = await supabase
  //       .from("users")
  //       .select("name")
  //       .eq("id", userId)
  //       .single();
  //     if (error) {
  //       console.error("Error fetching posted name:", error);
  //     } else {
  //       setPostedName(data?.name);
  //     }
  //   };

  //   if (payloadNew && payloadNew.length > 0) {
  //     const userId = payloadNew[0].user_id; // PayloadNew から user_id を取得
  //     if (userId) {
  //       fetchPostedName(userId);
  //     }
  //   }
  // }, [payloadNew]);

  useEffect(() => {
    if (modalVisible) {
      startCountdown(5);
    }
  }, [modalVisible, startCountdown]);

  useEffect(() => {
    const fetchThemeColors = async () => {
      try {
        const response = await fetch(
          `https://picolor-backend-go.onrender.com/controller/colors?roomID=${roomId}`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const resThemeColor = await response.json();
        setThemeColors(resThemeColor.themeColors);
      } catch (error) {
        console.error("Error fetching theme colors:", error);
      }
    };

    // const fetchPostData = async () => {
    //   try {
    //     const { data: postData, error } = await supabase
    //       .from("posts")
    //       .select("*")
    //       .eq("room_id", roomId);
    //     if (error) {
    //       console.error(error);
    //     } else if (postData) {
    //       console.log("postDataaaaaaaaaaaaa", postData);
    //       setPayloadNew(postData);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching post data:", error);
    //   }
    // };

    // fetchPostData();

    fetchThemeColors();
  }, [roomId]);

  useEffect(() => {
    console.log("roomId", roomId);
    const channel = supabase
      .channel("table_db_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "posts",
        },

        async (payload) => {
          if (payload.eventType === "INSERT") {
            setPayloadNew((prev) => [payload.new as PayloadNew, ...prev]);

            if (payload.new?.room_id === Number(roomId)) {
              const { data: Data, error } = await supabase
                .from("users")
                .select("name")
                .eq("id", payload.new.user_id)
                .single();

              if (error) {
                console.error(error);
              } else if (Data) {
                setPostedName((prev) => [
                  {
                    name: Data.name,
                    user_id: payload.new.user_id,
                  },
                ]);
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
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
      })}
    >
      <Header mode={HeaderMode.GRAY} />
      <SubPageTitle title="THEME COLOR" />
      <div
        className={css({
          display: "flex",
          justifyContent: "space-between",
          padding: "0 15vw",
        })}
      >
        {/* const decoededImage = `data:image/jpeg;base64,${Image}`; */}
        {themeColors.map((colorObj, index) => {
          const foundItem = payloadNew?.find(
            (item) => item.color_id === colorObj.ColorId
          );
          console.log("foundItem", foundItem);
          return (
            <div>
              <ColorCircle
                key={index}
                color={colorObj.ColorCode}
                delay={index * 1.0}
                imageURL={
                  foundItem ? `data:image/jpeg;base64,${foundItem?.image}` : ""
                }
                rank={
                  payloadNew?.find((item) => item.color_id === colorObj.ColorId)
                    ?.rank || 0
                }
                onAnimationComplete={
                  index === 2 ? () => setModalVisible(true) : undefined
                }
              />
              <PostedResult
                postedTime={
                  payloadNew?.find((item) => item.color_id === colorObj.ColorId)
                    ?.posted_time || ""
                }
                name={
                  posetedname?.find((item) => item.user_id === colorObj.ColorId)
                    ?.name || ""
                }
              />
            </div>
          );
        })}
      </div>
      {modalVisible && <CountDownModal visible={true} count={count} />}
      <div
        className={css({
          padding: "1vw ",
        })}
      >
        {stopwatchVisible && <Stopwatch time={stopwatch.time} />}
      </div>
    </div>
  );
}
