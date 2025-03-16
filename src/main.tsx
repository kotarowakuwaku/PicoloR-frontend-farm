import { Button as AntButton, ConfigProvider } from "antd";
import { css } from "../styled-system/css";
import { createStyles } from "antd-style";
import ExplainItem from "./components/ExplainItem";

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
      backgroundColor: "var(--primary)",
    },
  },
}));

export function Main() {
  const { styles } = useStyle();

  const subTitle = "色を探せ！ひらめきカラースナップ対決！";
  const onClickStart = async () => {
    // TODO: ここでAPIを叩いて部屋を作成する
    // apiを叩く
    // (代わりに一旦時間待つ)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // /host/room
    const res = { roomID: 12345 };

    // /room/:roomIDに移動
    window.location.href = `/room/${res.roomID}`;
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
            },
          },
        }}
      >
        <AntButton className={styles.homeButton} onClick={onClickStart}>
          START
        </AntButton>
      </ConfigProvider>
      <div
        className={css({
          position: "relative",
          mt: "1rem",
          h: "fit-content",
          w: "100%",
        })}
      >
        <div
          className={css({
            position: "absolute",
            top: "0",
            left: "0",
            h: "100%",
            w: "100%",
            zIndex: "-1",
          })}
        >
          <div
            className={css({
              position: "absolute",
              top: "0",
              left: "0",
              pt: "1rem",
              h: "100%",
              w: "100%",
              bg: "#f5f5f5",
              border: "3px solid #2d2d2d",
              borderRadius: "20px",
            })}
          />
        </div>
        <div
          className={css({
            mt: "2rem",
          })}
        >
          <h3
            className={css({
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              transform: "translateY(-50%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            })}
          >
            <span
              className={css({
                fontSize: "2rem",
                w: "fit-content",
                bg: "#f5f5f5",
                p: "0 1.5rem",
              })}
            >
              遊び方
            </span>
          </h3>
          <ul
            className={css({
              p: "1.2rem 4rem",
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
        </div>
      </div>
    </main>
  );
}
