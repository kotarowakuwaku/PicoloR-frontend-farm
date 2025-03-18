import { ConfigProvider, Modal } from "antd";
import { css } from "../../styled-system/css";


const LoadingModal = () => {
    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        Modal: {
                            contentBg: "transparent",
                            boxShadow: "none",
                            colorBgMask: "rgba(255, 255, 255, 0.8)"

                        },
                    },
                }}
            >
                <Modal open={true} footer={null} closable={false} title={null}>
                    <div
                        className={css({
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            marginTop: "100px",
                            fontSize: "4rem",
                            color: "#85581A",
                        })
                        }
                    >
                        Loading
                    </div>
                    <div className={css({
                        top: "70%",
                        left: "60%",
                        width: "calc(6 * 30px)",
                        height: "50px",
                        display: "flex",
                        color: "#85581A",
                        filter: "drop-shadow(30px 25px 0 currentColor) drop-shadow(60px 0 0 currentColor) drop-shadow(120px 0 0 currentColor)",
                        clipPath: "inset(0 100% 0 0)",
                        animation: "l11 2s infinite steps(7)",
                        transform: "rotate(-45deg) scale(2)",
                        transformOrigin: "center",
                        position: "fixed",
                        bottom: "30%",
                        right: "40%",


                        "&::before": {
                            content: '""',
                            width: "30px",
                            height: "25px",
                            background: "currentColor",
                            clipPath: "polygon(0 50%, 30% 40%, 100% 0, 60% 40%, 100% 50%, 60% 60%, 100% 100%, 30% 60%)",
                        },

                    })}></div>
                </Modal>
            </ConfigProvider>
        </>
    );
};

export default LoadingModal;
