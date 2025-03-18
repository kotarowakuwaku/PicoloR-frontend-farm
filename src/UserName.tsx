import { css } from "../styled-system/css";

function UserName({ userName }: { userName: string }) {
  return (
    <div
      className={css({
        h: "3rem",
        position: "fixed",
        bottom: "10px",
        left: "10px",
        right: "10px",
      })}
    >
      <div
        className={css({
          w: "full",
          p: "6px",
          bg: "white",
          fontSize: "1.5rem",
          textAlign: "center",
          borderRadius: "10px",
        })}
      >
        {userName}
      </div>
    </div>
  );
}

export default UserName;
