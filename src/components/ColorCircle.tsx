import React from "react";
import { motion } from "framer-motion";

interface ColorCircleProps {
  color: string;
  delay: number;
  onAnimationComplete?: () => void;
}

export const ColorCircle: React.FC<ColorCircleProps> = ({
  color,
  delay,
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
        borderRadius: "50%",
        backgroundColor: color,
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
      }}
    />
  );
};
