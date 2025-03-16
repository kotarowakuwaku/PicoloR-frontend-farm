import Header from "./components/Header";
import { HeaderMode } from "./types/HeaderMode";

export function Main() {
  return <Header mode={HeaderMode.GRAY} />;
}
