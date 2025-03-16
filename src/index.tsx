import Main from "./main";
import { createRoot } from "react-dom/client";
import "../styled-system/styles.css";

const container = document.querySelector("#root") as Element;
const root = createRoot(container);

root.render(<Main />);
