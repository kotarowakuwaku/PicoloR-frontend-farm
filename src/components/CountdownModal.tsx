import React from "react";
import { Modal } from "antd";

interface CountdownModalProps {
  visible: boolean;
  count: number;
}

const CountdownModal: React.FC<CountdownModalProps> = ({ visible, count }) => (
  <Modal visible={visible} title="カウントダウン" footer={null}>
    <div style={{ textAlign: "center", fontSize: "24px" }}>
      {count > 0 ? count : "終了しました"}
    </div>
  </Modal>
);

export default CountdownModal;
