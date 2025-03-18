import React from "react";
import { ConfigProvider, Modal } from "antd";
import "../styles/loading.css";
import { css } from "../../styled-system/css";

interface LoadingModalProps {
  visible: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ visible }) => {
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
            className={"title"}
          >
            Loading
          </div>
          <div className="loader"></div>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default LoadingModal;
