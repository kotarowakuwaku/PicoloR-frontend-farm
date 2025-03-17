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
import { image, radialGradient } from "framer-motion/client";

export function GameHost() {
  const [modalVisible, setModalVisible] = useState(false);
  const [stopwatchVisible, setStopwatchVisible] = useState(false);
  const { count, isCounting, startCountdown } = useCountdown(() => {
    setModalVisible(false);
    setStopwatchVisible(true);
    stopwatch.start();
  });

  const stopwatch = useStopwatch();

  const mockResponse: any[] = [
    { themeColor: "#19ff00", imageURL: "aaa.png", rank: 2 },
    { themeColor: "#004cff", imageURL: "bbb.png", rank: 3 },
    { themeColor: "#ff007f", imageURL: "bbb.png", rank: 1 },
  ];
  const mockColor = [
    { themeColor: "#19ff00" },
    { themeColor: "#ff007f" },
    { themeColor: "#004cff" },
  ];

  // モーダルが表示されたらカウントダウンを開始
  useEffect(() => {
    if (modalVisible) {
      startCountdown(5);
    }
  }, [modalVisible, startCountdown]);

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
        {mockColor.map(({ themeColor }, index) => (
          <ColorCircle
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
          />
        ))}
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

