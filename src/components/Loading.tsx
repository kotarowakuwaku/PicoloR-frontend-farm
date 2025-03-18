import { ConfigProvider, Modal } from "antd";
import "../styles/loading.css";


const LoadingModal = () => {
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
        <Modal open={true} footer={null} closable={false} title={null}>
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
