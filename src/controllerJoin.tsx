import { Button, ConfigProvider, Form, Input } from "antd";
import type { FormProps } from "antd";
import { css } from "../styled-system/css";
import Header from "./components/Header";
import { HeaderMode } from "./types/HeaderMode";
import { createStyles } from "antd-style";
import SelectIconButtons from "./components/SelectIconButtons";
import { useState } from "react";
import { supabase } from "./supabase/supabase";

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

export function ControllerJoin() {
  const { styles } = useStyle();
  // クエリパラメータを取得
  const url = new URL(window.location.href);
  const roomID = url.searchParams.get("roomID");
  const roomIDNum = Number(roomID);

  const icons = [
    { id: "1", imageURL: "/snake.png", name: "go" },
    { id: "2", imageURL: "/gopher.png", name: "go" },
    { id: "3", imageURL: "/swift-svgrepo-com.svg", name: "go" },
    { id: "4", imageURL: "/bird.png", name: "typescript" },
  ];
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

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

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    async function createUserAndRoom() {
      try {
        const userRes = await fetch(
          `https://picolor-backend-${selectedIcon}.onrender.com/controller/user`,
          {
            method: "POST",
            body: JSON.stringify({
              userName: values.username,
            }),
          }
        );

        if (!userRes.ok) {
          throw new Error(`HTTP error! status: ${userRes.status}`);
        }

        const userData = await userRes.json();
        const userID = userData.userID; // ここで取得
        console.log(userID);

        const joinRoomRes = await fetch(
          `https://picolor-backend-${selectedIcon}.onrender.com/controller/room`,
          {
            method: "POST",
            body: JSON.stringify({
              roomID: roomIDNum,
              userID: userID,
            }),
          }
        );

        if (!joinRoomRes.ok) {
          throw new Error(`HTTP error! status: ${joinRoomRes.status}`);
        }

        const { error } = await supabase
          .from("techs")
          .insert({ tech_name: selectedIcon, user_id: userID });

        if (error) {
          console.error(error);
        }

        window.location.href = `/PicoloR-frontend-farm/controller/?roomID=${roomID}&userID=${userID}`;
      } catch (err) {
        console.error("エラー:", err);
      }
    }

    createUserAndRoom();
  };

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

      <Form
        onFinish={onFinish}
        autoComplete="off"
        className={styles.field}
        requiredMark={false}
      >
        <Form.Item label={null}>
          <SelectIconButtons
            options={icons}
            onChange={(id) => {
              console.log("選択された ID:", id);
              setSelectedIcon(
                icons.find((icon) => icon.id === id)?.name || null
              );
            }} // ✅ フォームの値として ID を設定
          />
        </Form.Item>

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
      </Form>
    </main>
  );
}
