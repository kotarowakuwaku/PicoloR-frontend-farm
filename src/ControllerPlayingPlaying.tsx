import { Form } from "antd";
import { css } from "../styled-system/css";
import { useEffect, useState } from "react";

function ControllerPlayingPlaying() {
  const [isJudging, setIsJudging] = useState(false);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [inputFileString, setInputFileString] = useState<string | null>(null);
  const [inputFile, setInputFile] = useState<File | null>(null);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setInputFile(file);
    setInputFileString(URL.createObjectURL(file));
    setIsJudging(true);

    // 50秒後に画像を削除
    setTimeout(() => {
      setIsJudging(false);
    }, 1000);
  };

  useEffect(() => {
    if (selectedColor === null) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return;

    const image = new Image();
    image.src;
  }, [inputFileString]);

  return (
    <Form
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 画像ファイル入力欄 */}
      <Form.Item name="image" valuePropName="pic">
        <input
          type="file"
          accept="image/*"
          id="file-input"
          capture="environment"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </Form.Item>
      {inputFile === null || inputFileString === null ? (
        <div
          className={css({
            w: "full",
            h: "full",
            p: "6rem 10px 5rem 10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
          })}
        >
          <label
            htmlFor="file-input"
            className={css({
              w: "20dvh",
              h: "20dvh",
              bg: "red",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            })}
          >
            <img src="/camera.svg" alt="カメラ" />
          </label>
          <label
            htmlFor="file-input"
            className={css({
              w: "20dvh",
              h: "20dvh",
              bg: "blue",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            })}
          >
            <img src="/camera.svg" alt="カメラ" />
          </label>
          <label
            htmlFor="file-input"
            className={css({
              w: "20dvh",
              h: "20dvh",
              bg: "green",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            })}
          >
            <img src="/camera.svg" alt="カメラ" />
          </label>
        </div>
      ) : (
        <img
          className={css({
            h: "60dvh",
            opacity: isJudging ? "0.5" : "1",
          })}
          src={inputFileString}
          alt="入力画像"
        />
      )}
    </Form>
  );
}

export default ControllerPlayingPlaying;
