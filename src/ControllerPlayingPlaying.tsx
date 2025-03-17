import { Form } from "antd";
import { css } from "../styled-system/css";
import { useEffect, useState } from "react";

function ControllerPlayingPlaying() {
  const [isJudging, setIsJudging] = useState(false);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [inputFileString, setInputFileString] = useState<string | null>(null);
  const [inputFile, setInputFile] = useState<File | null>(null);

  const url = new URL(window.location.href);
  const roomID = url.searchParams.get("roomID");
  const roomIDNum = Number(roomID);
  const userID = url.searchParams.get("userID");
  const userIDNum = Number(userID);

  const color = "#ff0000";

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setInputFile(file);
    setInputFileString(URL.createObjectURL(file));
    setIsJudging(true);

    console.log("file", file);
    // fileをbase64に変換
    const base64Image = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result !== "string") {
          reject(new Error("reader.result is not string"));
          return;
        }
        resolve(reader.result);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
    });

    // data:image/png;base64,を削除
    const base64ImageString = base64Image.split(",")[1];

    console.log("今からpost!", base64ImageString);
    const res = await fetch(
      "https://picolor-backend-python.onrender.com/controller/image",
      {
        method: "POST",
        body: JSON.stringify({
          userID: userIDNum,
          colorID: 10,
          image: base64ImageString,
        }),
      }
    )
      .then(async (res) => {
        return await res.json();
      })
      .catch((err) => {
        throw new Error(err);
      });

    setIsJudging(false);

    console.log(res);
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
        <div
          className={css({
            position: "relative",
            display: "inline-block",
            w: "fit-content",
            h: "fit-content",
            overflow: "hidden",
          })}
        >
          <img
            className={css({
              h: "60dvh",
              opacity: isJudging ? "0.5" : "1",
              display: "block",
            })}
            src={inputFileString}
            alt="入力画像"
          />
          <div
            className={css({
              position: "absolute",
              bottom: "0",
              left: "0",
              right: "0",
              h: "100%",
              w: "100%",
              background: `linear-gradient(to bottom, transparent 20%, ${color} 50%, transparent 80%)`,
              animation: "radar-scan 4s linear infinite",
            })}
          />
        </div>
      )}
    </Form>
  );
}

export default ControllerPlayingPlaying;
