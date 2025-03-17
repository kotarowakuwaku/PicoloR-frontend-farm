import { Button, ConfigProvider, Form, Input } from "antd";
import type { FormProps } from "antd";
import { css } from "../styled-system/css";
import Header from "./components/Header";
import { HeaderMode } from "./types/HeaderMode";
import { createStyles } from "antd-style";
import { CONTROLLER_PLAYING_MODE } from "./const";
import { useState } from "react";
import ControllerPlayingWaiting from "./ControllerPlayingWaiting";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const useStyle = createStyles(() => ({
  input: {
    width: "100%",
    borderRadius: "10px",
    border: "2px solid var(--secondary)",
    padding: "10px",
    fontSize: "1.5rem",
    textAlign: "center",
    fontFamily: "M PLUS 1p",
  },
  field: {
    width: "100%",
    "& .ant-form-item-label": {
      fontWeight: "regular",
      fontFamily: "M PLUS 1p",
      textAlign: "center",
      width: "100%",
    },
  },
  customLabel: {
    fontSize: "1.5rem",
    color: "var(--secondary)",
  },
}));

export function ControllerPlaying() {
  const { styles } = useStyle();
  // クエリパラメータを取得
  const url = new URL(window.location.href);
  const roomID = url.searchParams.get("roomID");
  const roomIDNum = Number(roomID);
  const userID = url.searchParams.get("userID");
  console.log("roomID: ", roomID, ", userID: ", userID);
  const [currentMode, setCurrentMode] = useState<CONTROLLER_PLAYING_MODE>(
    CONTROLLER_PLAYING_MODE.WAITING
  );

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    // const postMember = async () => {
    //   fetch("https://picolor-backend-go.onrender.com/controller/room", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       roomID: roomIDNum,
    //       userName: values.username,
    //     }),
    //   })
    //     .then(async (res) => {
    //       const data = await res.json();
    //       const userID = data.userID;
    //       console.log(userID);
    //       window.location.href = `/controller/?roomID=${roomID}&userID=${userID}`;
    //     })
    //     .catch((err) => {
    //       throw new Error(err);
    //     });
    // };
    // postMember();
  };

  if (!roomID) {
    return (
      <main
        className={css({
          h: "100dvh",
          w: "100dvw",
          p: "10px 30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        })}
      >
        <Header mode={HeaderMode.GREEN} />

        <p
          className={css({
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "red",
            textAlign: "center",
          })}
        >
          roomID が存在しません。
          <br />
          正しい画面に接続してください。
        </p>
      </main>
    );
  }

  if (!userID) {
    return (
      <main
        className={css({
          h: "100dvh",
          w: "100dvw",
          p: "10px 30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        })}
      >
        <Header mode={HeaderMode.GREEN} />

        <p
          className={css({
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "red",
            textAlign: "center",
          })}
        >
          userID が存在しません。
          <br />
          正しい画面に接続してください。
        </p>
      </main>
    );
  }

  return (
    <main
      className={css({
        h: "100dvh",
        w: "100dvw",
        p: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      })}
    >
      <Header mode={HeaderMode.GREEN} />
      {/* currentModeによって切り替える */}
      {currentMode === CONTROLLER_PLAYING_MODE.WAITING && (
        <ControllerPlayingWaiting />
      )}
      {currentMode === CONTROLLER_PLAYING_MODE.PLAYING && (
        <div>
          <h1>PLAYING</h1>
        </div>
      )}
      {currentMode === CONTROLLER_PLAYING_MODE.CLEARED && (
        <div>
          <h1>CLEARED</h1>
        </div>
      )}
      {currentMode === CONTROLLER_PLAYING_MODE.FINISHED && (
        <div>
          <h1>FINISHED</h1>
        </div>
      )}

      {/* <Form
        onFinish={onFinish}
        autoComplete="off"
        className={styles.field}
        requiredMark={false}
      }

      {/* s<Form
        onFinish={onFinish}
        autoComplete="off"
        className={styles.field}
        requiredMark={false}
      >
        <Form.Item<FieldType>
          label={<span className={styles.customLabel}>USER NAME</span>}
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input size="large" className={styles.input} />
        </Form.Item>

        <Form.Item label={null}>
          <ConfigProvider
            theme={{
              token: {
                colorText: "black",
                borderRadius: 4,
              },
              components: {
                Button: {
                  colorPrimaryHover: "black", // Hover時の色
                  colorPrimaryBorderHover: "#007A30",
                },
              },
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{
                marginTop: "40px",
                fontSize: "1.5rem",
                width: "100%",
                textAlign: "center",
                backgroundColor: "#0AC74F",
                color: "white",
                padding: "24px",
                border: "2px solid black",
                fontFamily: "M PLUS 1p",
                fontWeight: "bold",
                borderRadius: "10px",
              }}
            >
              JOIN
            </Button>
          </ConfigProvider>
        </Form.Item>
      </Form> */}
    </main>
  );
}
