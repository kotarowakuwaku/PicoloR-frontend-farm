import { SubPageTitle } from "./components/SubTitle";
import { ColorCircle } from "./components/ColorCircle";
import { css } from "../styled-system/css";
import Header from "./components/Header";
import { HeaderMode } from "./types/HeaderMode";

export function GameHost() {
  const mockResponse = {
    themeColors: ["#19ff00", "#ff007f", "#004cff"],
  };

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
      })}
    >
      <Header mode={HeaderMode.GRAY} />
      <SubPageTitle title="THEME COLOR" />
      <div
        className={css({
          display: "flex", // 横に羅列するためにflexを使用

          justifyContent: "space-between", // 中央揃え
          padding: "0 15vw", // 左右に10vwのpaddingを設定
        })}
      >
        {mockResponse.themeColors.map((color, index) => (
          <ColorCircle key={index} color={color} />
        ))}
      </div>
    </div>
  );
}
