import React from "react";
import { Button } from "antd";

type IconButtonProps = {
  imageURL: string;
  onClick: () => void;
  selected: boolean; // ✅ 選択状態を受け取る
};

const IconButton = ({ imageURL, onClick, selected }: IconButtonProps) => {
  return (
    <Button
      type={selected ? "primary" : "default"} // ✅ 選択状態で色を変更
      shape="circle"
      icon={
        <img
          src={imageURL}
          alt=""
          style={{ width: "70%", display: "flex", margin: "auto" }}
        />
      }
      onClick={onClick}
      style={{
        width: "60px",
        height: "60px",
      }}
    />
  );
};

export default IconButton;
