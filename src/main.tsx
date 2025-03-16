import Header from "./components/Header";
import { HeaderMode } from "./types/HeaderMode";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import useCountdown from "./hooks/useCountdown";
import CountdownModal from "./components/CountdownModal";

const Main: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [initialCount, setInitialCount] = useState<number>(5);

  // モーダル表示時にのみカウントダウンを実行
  const count = useCountdown(initialCount, modalVisible);

  useEffect(() => {
    if (modalVisible && count === 0) {
      setModalVisible(false);
      console.log("カウントダウン終了");
    }
  }, [modalVisible, count]);

  const startCountdown = () => {
    setInitialCount(5);
    setModalVisible(true);
    console.log("カウントダウン開始")
  };

  return (
    <div>
      <Header mode={HeaderMode.GREEN} />
      <Button type="primary" onClick={startCountdown}>
        カウントダウン開始
      </Button>
      <CountdownModal visible={modalVisible} count={count} />
    </div>
  );
};

export default Main;
