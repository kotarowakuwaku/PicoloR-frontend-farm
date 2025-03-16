import React from "react";
import { Modal } from "antd";

interface CountdownModalProps {
  visible: boolean;
  count: number;
}

const CountdownModal: React.FC<CountdownModalProps> = ({ visible, count }) => (
  <Modal open={visible} title="カウントダウン" footer={null}>
    <div style={{ textAlign: "center", fontSize: "24px" }}>
      {count > 0 ? count : ""}
    </div>
  </Modal>
);

export default CountdownModal;
