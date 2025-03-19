import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./main";
import { Rooms } from "./room";
import { GameHost } from "./gamehost";
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
      <Route path="/" element={<Main />} />
      <Route path="/test" element={<Test />} />
      <Route path="/room/:roomId" element={<Rooms />} />
      <Route path="/controller/join" element={<ControllerJoin />} />
      <Route path="/controller" element={<ControllerPlaying />} />
      <Route path="/result/:roomId" element={<Result />} />
      <Route path="/room/:roomId/hostUser" element={<GameHost />} />
    </Routes>
  </BrowserRouter>
);
