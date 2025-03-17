import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { css } from "../../styled-system/css";

interface ColorCircleProps {
  color: string;
  delay: number;
  imageURL?: string;
  rank?: number;
  onAnimationComplete?: () => void;
}

const res_mockWebsocketData_pthoto = {
  action: "photo_submitted",
  roomID: "int",
  posts: [
    {
      rank: "int",
      userName: "string",
      color: "string",
    },
  ],
};
export const ColorCircle: React.FC<ColorCircleProps> = ({
  color,
  delay,
  imageURL,
  rank,
  onAnimationComplete,
}) => {
  console.log("rank", rank);
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

  return (
    <div style={{ position: "relative", width: "20vw", height: "20vw" }}>
      <img
        src={rankImage()}
        alt=""
        className={css({
          w: "50%",
          h: "40%",
          position: "absolute",
          transform: "rotate(40deg)", // 画像を45度右に傾ける
          float: "right",
          top: "-15%",
          right: "-15%",
          zIndex: 1,
        })}
      />
      {imageURL ? (
        <div
          style={{
            display: "flex",
            width: "20vw",
            height: "20vw",
            borderRadius: "20%",
            backgroundColor: color,
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
          }}
        ></div>
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
