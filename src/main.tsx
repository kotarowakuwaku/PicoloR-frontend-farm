import Header from "./components/Header";
import { HeaderMode } from "./types/HeaderMode";
import React, { useState } from "react";
import { Button } from "antd";
import CountdownModal from "./components/CountdownModal";
import useCountdown from "./hooks/useCountdown";

const Main: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const { count, isCounting, startCountdown } = useCountdown(() => {
    setModalVisible(false);
    console.log("カウントダウン終了");
  });

  const handleClick = () => {
    startCountdown(5); // 5秒のカウントダウン開始
  };

  return (
    <div>
      <Header mode={HeaderMode.GREEN} />

      <CountdownModal visible={isCounting} count={count} />
      <Button type="primary" onClick={handleClick}>
        カウントダウン
      </Button>
    </div>
  );
};

export default Main;
