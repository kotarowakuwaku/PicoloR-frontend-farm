import React from "react";
import { ConfigProvider, Modal } from "antd";
import { css } from "../../styled-system/css";

interface CountdownModalProps {
  visible: boolean;
  count: number;
}

const CountdownModal: React.FC<CountdownModalProps> = ({ visible, count }) => {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: "transparent",
              boxShadow: "none",
            },
          },
        }}
      >
        <Modal open={visible} footer={null} closable={false} title={null}>
          <div
            className={css({
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              fontSize: "15rem",
              color: "transparent",
              WebkitTextStroke: "0.7rem white",
              fontFamily: "Oswald",
            })}
          >
            {count > 0 ? count : ""}
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default CountdownModal;
