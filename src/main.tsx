import { Button as AntButton, ConfigProvider } from "antd";
import { css } from "../styled-system/css";
import { createStyles } from "antd-style";
import ExplainItem from "./components/ExplainItem";
import BoxBorderedContainerWithTitle from "./components/BoxBorderedContainerWithTitle";
import { useNavigate } from "react-router-dom";

const useStyle = createStyles(() => ({
  homeButton: {
    textAlign: "center",
    backgroundColor: "var(--light)",
    fontSize: "3rem",
    color: "var(--secondary)",
    padding: "10px 120px",
    border: "4px dashed #2d2d2d",
    borderRadius: "10px",
    height: "auto",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: "var(--dark)",
    },
  },
}));

export function Main() {
  const { styles } = useStyle();
  const navigate = useNavigate();

  const subTitle = "色を探せ！ひらめきカラースナップ対決！";

  const onClickStart = async () => {
    fetch("https://picolor-backend-go.onrender.com/host/room", {
      method: "POST",
    })
      .then(async (res) => {
        const data = await res.json();
        const roomID = data.roomID;
        console.log(roomID);
        // window.location.href = `/PicoloR-frontend-farm/room/${roomID}`;
        navigate(`/room/${roomID}`);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return (
    <main
      className={css({
        h: "100dvh",
        w: "100dvw",
        p: "20px 60px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      })}
    >
      <img
        src="/brash.svg"
        alt=""
        className={css({
          position: "absolute",
          mt: "-10dvh",
          top: "30dvh",
          right: "0",
          h: "380px",
          zIndex: "-1",
        })}
      />
      <img
        src="/palette.svg"
        alt=""
        className={css({
          position: "absolute",
          top: "0",
          left: "0",
          h: "380px",
          zIndex: "-1",
        })}
      />
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <h2
          className={css({
            fontSize: "2.6rem",
            fontWeight: "bold",
          })}
        >
          {subTitle.split("").map((char, index) => (
            <span
              key={index}
              className={css({
                display: "inline-block",
                transition: "transform 0.3s",
                transform: "translateY(0)",
                "&:hover": {
                  transform: "translateY(-10px)",
                },
              })}
            >
              {char}
            </span>
          ))}
        </h2>
        <h1>
          <img
            className={css({
              mt: "-1rem",
              mb: "-2rem",
              h: "30dvh",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.2)",
              },
            })}
            src="/Logo.svg"
            alt="PicoloRロゴ"
          />
        </h1>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultHoverBg: "#dddddd",
              defaultHoverColor: "var(--secondary)",
              defaultHoverBorderColor: "var(--secondary)",
              defaultActiveColor: "#F5F5F5",
              defaultActiveBg: "#2E2E2E",
              defaultActiveBorderColor: "#2E2E2E",
            },
          },
        }}
      >
        <AntButton className={styles.homeButton} onClick={onClickStart}>
          START
        </AntButton>
      </ConfigProvider>
      <BoxBorderedContainerWithTitle title="遊び方">
        <ul
          className={css({
            p: "0 2.8rem",
            mt: "-24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            alignItems: "center",
          })}
        >
          <ExplainItem
            id="devices"
            text="1. 人数分のスマホを登録"
            iconPath="/devices.svg"
            alt="PCとスマホのイラスト"
          />
          <ExplainItem
            id="laptop_colors"
            text="2. テーマカラーの発表！"
            iconPath="/laptop_colors.svg"
            alt="PCにテーマカラーが表示されるイラスト"
          />
          <ExplainItem
            id="capture_color"
            text="3. スマホでテーマ色の写真を撮影！"
            iconPath="/capture_color.svg"
            alt="スマホでカラーを撮影するイラスト"
          />
        </ul>
      </BoxBorderedContainerWithTitle>
    </main>
  );
}
