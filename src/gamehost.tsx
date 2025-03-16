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

export function GameHost() {
  const [modalVisible, setModalVisible] = useState(false);
  const [stopwatchVisible, setStopwatchVisible] = useState(false);
  const { count, isCounting, startCountdown } = useCountdown(() => {
    setModalVisible(false);
    setStopwatchVisible(true);
    stopwatch.start();
  });

  const stopwatch = useStopwatch();

  const mockResponse = {
    themeColors: ["#19ff00", "#ff007f", "#004cff"],
  };

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
        {mockResponse.themeColors.map((color, index) => (
          <ColorCircle
            key={index}
            color={color}
            delay={index * 1.0}
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
