import { defineFarmConfig } from "@farmfe/core";

export default defineFarmConfig({
  compilation: {
    output: {
      publicPath: "/PicoloR-frontend-farm/", // GitHub Pages 用にリポジトリ名を設定
    },
  },
});
