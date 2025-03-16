import { Button as AntButton, ConfigProvider } from "antd";
import { css } from "../styled-system/css";
import { createStyles } from "antd-style";

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

  return (
    <main
      className={css({
        h: "100dvh",
        w: "100dvw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "40px",
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
            fontFamily: "Londrina Solid",
            fontSize: "2.6rem",
            fontWeight: "bold",
          })}
        >
          色を探せ！ひらめきカラースナップ対決！
        </h2>
        <h1>
          <img
            className={css({
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
        <AntButton
          className={styles.homeButton}
          onClick={() => console.log("START")}
        >
          START
        </AntButton>
      </ConfigProvider>
    </main>
  );
}
