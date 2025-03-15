import { defineConfig } from '@farmfe/core';

export default defineConfig({
  plugins: ['@farmfe/plugin-react'],
  compilation: {
    output: {
      publicPath: "/PicoloR-frontend-farm/", // GitHub Pages 用にリポジトリ名を設定
    },
  },
});
