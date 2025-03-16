import { css } from "../../styled-system/css";

interface BoxBorderedContainerWithTitleProps {
  title: string;
  children: React.ReactNode;
}

const BoxBorderedContainerWithTitle = ({
  title,
  children,
}: BoxBorderedContainerWithTitleProps) => {
  return (
    <div
      className={css({
        position: "relative",
        mt: "1rem",
        h: "fit-content",
        w: "100%",
      })}
    >
      <div
        className={css({
          position: "absolute",
          top: "0",
          left: "0",
          h: "100%",
          w: "100%",
          zIndex: "-1",
        })}
      >
        <div
          className={css({
            position: "absolute",
            top: "0",
            left: "0",
            pt: "1rem",
            h: "100%",
            w: "100%",
            bg: "var(--light)",
            backgroundImage: `url("https://www.transparenttextures.com/patterns/45-degree-fabric-light.png")`,
            border: "3px solid #2d2d2d",
            borderRadius: "20px",
          })}
        />
      </div>
      <div
        className={css({
          mt: "2rem",
        })}
      >
        <h3
          className={css({
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            transform: "translateY(-50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          })}
        >
          <span
            className={css({
              fontSize: "2rem",
              w: "fit-content",
              bg: "var(--light)",
              backgroundImage: `url("https://www.transparenttextures.com/patterns/45-degree-fabric-light.png")`,
              p: "0 1.5rem",
            })}
          >
            {title}
          </span>
        </h3>
        <div
          className={css({
            p: "1.2rem",
          })}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default BoxBorderedContainerWithTitle;
