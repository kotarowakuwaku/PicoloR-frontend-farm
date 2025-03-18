import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { css } from "../../styled-system/css";

interface ColorCircleProps {
  color: string;
  delay: number;
  imageURL?: string;
  rank?: number;
  name?: string;

  onAnimationComplete?: () => void;
}
// const TestImage = "/test.png";

export const ColorCircle: React.FC<ColorCircleProps> = ({
  color,
  delay,
  imageURL,
  rank,
  onAnimationComplete,
}) => {
  console.log("rank", rank);
  console.log("passedthemeColor", color);
  const rankImage = () => {
    switch (rank) {
      case 1:
        return "/first_place.png";
      case 2:
        return "/second_place.png";
      case 3:
        return "/third_place.png";
      default:
        return "";
    }
  };
  // imageURL = TestImage;
  return (
    <div style={{ position: "relative", width: "20vw", height: "20vw" }}>
      {imageURL ? (
        <div style={{ position: "relative", width: "20vw", height: "20vw" }}>
          <img
            src={rankImage()}
            alt=""
            className={css({
              w: "50%",
              h: "40%",
              position: "absolute",
              transform: "rotate(40deg)",
              float: "right",
              top: "-15%",
              right: "-15%",
              zIndex: 1,
            })}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "20%",
              backgroundColor: color,
              boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
            }}
          ></div>
          <img
            src={imageURL}
            alt="Test Image"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "block",
              width: "60%",
              height: "80%",
            }}
          />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }} // 初期状態
          animate={{ opacity: 1 }} // 目標状態
          transition={{ delay, duration: 0.5, ease: "easeInOut" }} // 遅延、アニメーションの長さ、イージング
          onAnimationComplete={onAnimationComplete}
          style={{
            display: "flex",
            width: "20vw",
            height: "20vw",
            borderRadius: "50%",
            backgroundColor: color,
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
          }}
        />
      )}
    </div>
  );
};
