import React, { useState } from "react";
import { Space } from "antd";
import IconButton from "./IconButton";

type SelectIconButtonsProps = {
  options: { id: string; imageURL: string }[];
  onChange?: (id: string) => void; // ✅ 選択した id を親コンポーネントに渡す
};

const SelectIconButtons = ({ options, onChange }: SelectIconButtonsProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setSelectedId(id);
    onChange?.(id); // ✅ 親コンポーネントに選択した id を渡す
  };

  return (
    <Space>
      {options.map(({ id, imageURL }) => (
            <IconButton
              key={id}
              imageURL={imageURL}
              onClick={() => handleClick(id)}
              selected={selectedId === id}
            />
      ))}
    </Space>
  );
};

export default SelectIconButtons;
