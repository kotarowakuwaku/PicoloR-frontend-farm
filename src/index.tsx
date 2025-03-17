import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./main";
import { Rooms } from "./room"; // 新しく作成したTestコンポーネント
import { GameHost } from "./gamehost"; // 新しく作成したTestコンポーネント
import { Result } from "./result";
import "./index.css";
import "../styled-system/styles.css";

const container = document.querySelector("#root") as Element;
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="PicoloR-frontend-farm/" element={<Main />} />
      <Route
        path="PicoloR-frontend-farm/room/:roomId"
        element={<Rooms />}
      />{" "}
      {/* 新しいページ */}
      <Route
        path="PicoloR-frontend-farm/room/:roomId/hostUser"
        element={<GameHost />}
      />
      <Route path="PicoloR-frontend-farm/result/:roomId" element={<Result />} />
    </Routes>
  </BrowserRouter>
);
