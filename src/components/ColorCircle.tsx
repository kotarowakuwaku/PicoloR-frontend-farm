import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface ColorCircleProps {
  color: string;
  delay: number;
  imageURL?: string;
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

// useEffect(() => {
//   if (params === res_mockWebsocketData_pthoto.roomid) {
//   }
// }, [res_mockWebsocketData_pthoto]);

//WebSocketのデータを受け取った色のデータのisSubmittedをtrueにする

export const ColorCircle: React.FC<ColorCircleProps> = ({
  color,
  delay,
  imageURL,
  onAnimationComplete,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }} // 初期状態
      animate={{ opacity: 1 }} // 目標状態
      transition={{ delay, duration: 0.5, ease: "easeInOut" }} // 遅延、アニメーションの長さ、イージング
      onAnimationComplete={onAnimationComplete}
      style={{
        display: "flex",
        width: "20vw",
        height: "20vw",
        borderRadius: imageURL ? "20%" : "50%",
        backgroundColor: color,
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
      }}
    />
  );
};
