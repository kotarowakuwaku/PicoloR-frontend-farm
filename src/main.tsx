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
        <AntButton
          className={styles.homeButton}
          onClick={() => console.log("START")}
        >
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
              p: "1.2rem",
              mt: "-24px",
              display: "flex",
              direction: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "40px",
            })}
          >
            <li
              className={css({
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              })}
            >
              <img src="/devices.svg" alt="PCとスマホのイラスト" />
              1. 人数分のスマホを登録
            </li>
            <li
              className={css({
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              })}
            >
              <img
                id="laptop_colors"
                src="/laptop_colors.svg"
                alt="PCにテーマカラーが表示されるイラスト"
                className={css({
                  h: "160px",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                })}
              />
              <label
                htmlFor="laptop_colors"
                className={css({
                  fontSize: "1.2rem",
                  color: "var(--primary)",
                })}
              >
                2. テーマカラーの発表！
              </label>
            </li>
            <li
              className={css({
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              })}
            >
              <img
                src="/capture_color.svg"
                alt="スマホでカラーを撮影するイラスト"
              />
              3. スマホでテーマ色の写真を撮影！
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
