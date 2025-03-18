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
          position: "absolute",
          top: "-50px",
          right: "-50px",
          w: "100px",
          h: "100px",
          transform: "rotate(45deg)",
          transition: "opacity 0.5s",
          zIndex: 2,
        })}
      />
    </div>
  );
}

export default ControllerPlayingCleared;
