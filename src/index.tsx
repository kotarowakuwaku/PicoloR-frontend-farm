import { createRoot } from "react-dom/client";
import { ControllerJoin } from "./controllerJoin";
import "./index.css";
import "../styled-system/styles.css";

const container = document.querySelector("#root") as Element;
const root = createRoot(container);

root.render(<ControllerJoin />);
