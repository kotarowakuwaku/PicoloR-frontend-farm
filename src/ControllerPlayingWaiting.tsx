import { css } from "../styled-system/css";
import BoxBorderedContainerWithTitle from "./components/BoxBorderedContainerWithTitle";
import ExplainItem from "./components/ExplainItem";

function ControllerPlayingWaiting() {
  return (
    <div
      className={css({
        w: "full",
        h: "full",
        p: "5rem 10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      })}
    >
      <div
        className={css({
          w: "full",
          textAlign: "center",
          fontSize: "1.2rem",
          fontWeight: "bold",
        })}
      >
        ゲーム開始までお待ちください
      </div>
      <BoxBorderedContainerWithTitle title="遊び方" isMobile>
        <ul
          className={css({
            h: "100%",
            w: "100%",
            maxH: "fit-content",
            mt: "-24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          })}
        >
          <ExplainItem
            id="tap_color"
            text="1. 撮影するテーマカラーを選択する"
            iconPath={"/tab_color.svg"}
            alt="PCとスマホのイラスト"
            isMobile
          />
          <ExplainItem
            id="capture_color"
            text="2. 起動したカメラで撮影する"
            iconPath={"/capture_color."}
            alt="起動したカメラで撮影するイラスト"
            isMobile
          />
          <ExplainItem
            id="picture_passed"
            text="3. 送信！先に判定が通れば勝利！"
            iconPath={"/picture_passed.svg"}
            alt="判定OKが出たイラスト"
            isMobile
          />
        </ul>
      </BoxBorderedContainerWithTitle>
    </div>
  );
}

export default ControllerPlayingWaiting;
