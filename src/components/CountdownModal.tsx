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
        <Modal
          open={true}
          footer={null}
          closable={false}
          title={null}
          className={"custom-modal-content"}
          background-color={"transparent"}
        >
          <div
            className={css({
              textAlign: "center",
              fontSize: "240px",
            })}
          >
            {count > 0 ? count : ""}hoge
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default CountdownModal;
