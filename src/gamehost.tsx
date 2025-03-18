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

export function GameHost() {
  const [modalVisible, setModalVisible] = useState(false);
  const [stopwatchVisible, setStopwatchVisible] = useState(false);
  const { roomId } = useParams<{ roomId: string }>();
  const [themeColors, setThemeColors] = useState<ColorObj[]>([]);
  const [imageURL, setImageURL] = useState<string>();
  const [payloadNew, setPayloadNew] = useState<PayloadNew[]>([]);

  const { count, isCounting, startCountdown } = useCountdown(() => {
    setModalVisible(false);
    setStopwatchVisible(true);
    stopwatch.start();
  });

  type ColorObj = {
    ColorId: number;
    ColorCode: string;
  };

  type PayloadNew = {
    color_id: number;
    image: string;
    posted_time: string;
    rank: number;
    room_id: number;
    user_id: number;
  };

  const stopwatch = useStopwatch();
  console.log("themeColors", themeColors);

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
            console.log("hogee000000", payload.new);
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
                // console.log(Data);
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
        {themeColors.map((colorObj, index) => (
          <ColorCircle
            key={index}
            color={colorObj.ColorCode}
            delay={index * 1.0}
            imageURL={
              payloadNew?.find((item) => item.color_id === colorObj.ColorId)
                ?.image || ""
            }
            // rank={payloadNew?.rank}
            onAnimationComplete={
              index === 2 ? () => setModalVisible(true) : undefined
            }
          />
        ))}

        {/* <ColorCircle
            key={index}
            color={themeColor}
            delay={index * 1.0}
            imageURL={
              mockResponse?.find((item) => item.themeColor === themeColor)
                ?.imageURL || ""
            }
            rank={
              mockResponse?.find((item) => item.themeColor === themeColor)
                ?.rank || 0
            }
            onAnimationComplete={
              index === 2 ? () => setModalVisible(true) : undefined
            } 
          />*/}
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
