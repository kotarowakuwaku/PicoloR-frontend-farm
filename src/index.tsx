import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./main";
import { Rooms } from "./room"; // 新しく作成したTestコンポーネント
import "./index.css";
import "../styled-system/styles.css";
import { ControllerJoin } from "./controllerJoin";

const container = document.querySelector("#root") as Element;
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="PicoloR-frontend-farm/" element={<Main />} />
      <Route path="PicoloR-frontend-farm/room/:roomId" element={<Rooms />} />
      <Route
        path="PicoloR-frontend-farm/controller/join"
        element={<ControllerJoin />}
      />
    </Routes>
  </BrowserRouter>
);
