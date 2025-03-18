import { css } from "../styled-system/css";
import { CROWN_IMAGE_PATH } from "./const";
import Post from "./types/Post";

function ControllerPlayingCleared({ post }: { post: Post }) {
  return (
    <div
      className={css({
        position: "relative",
        display: "inline-block",
        w: "fit-content",
        h: "fit-content",
      })}
    >
      <img
        className={css({
          h: "60dvh",
          display: "block",
        })}
        src={post.imagePath || ""}
        alt="入力画像"
      />
      <img
        src={CROWN_IMAGE_PATH[post.rank - 1]}
        alt={`${post.rank}位の王冠`}
        className={css({
          w: "20dvh",
          h: "15dvh",
          position: "absolute",
          transform: "rotate(40deg)",
          float: "right",
          top: "-15%",
          right: "-15%",
          zIndex: 1,
        })}
      />
    </div>
  );
}

export default ControllerPlayingCleared;
