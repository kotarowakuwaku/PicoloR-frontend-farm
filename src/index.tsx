import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./main";
import { Rooms } from "./room"; // 新しく作成したTestコンポーネント
import { GameHost } from "./gamehost"; // 新しく作成したTestコンポーネント
import { Result } from "./result";
import { Test } from "./test";
import "./index.css";
import "../styled-system/styles.css";
import { ControllerJoin } from "./controllerJoin";
import { ControllerPlaying } from "./controllerPlaying";

const container = document.querySelector("#root") as Element;
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="PicoloR-frontend-farm/" element={<Main />} />
      <Route path="PicoloR-frontend-farm/test" element={<Test />} />


      <Route path="PicoloR-frontend-farm/room/:roomId" element={<Rooms />} />
      <Route
        path="PicoloR-frontend-farm/controller/join"
        element={<ControllerJoin />}

      />
      <Route
        path="PicoloR-frontend-farm/controller"
        element={<ControllerPlaying />}
      />
      <Route path="PicoloR-frontend-farm/result/:roomId" element={<Result />} />
      <Route
        path="PicoloR-frontend-farm/room/:roomId/hostUser"
        element={<GameHost />}/>
    </Routes>
  </BrowserRouter>
);
