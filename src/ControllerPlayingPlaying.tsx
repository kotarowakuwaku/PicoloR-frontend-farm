import { Form, message } from "antd";
import { css } from "../styled-system/css";
import { useEffect, useState } from "react";

function ControllerPlayingPlaying() {
  const [isJudging, setIsJudging] = useState(false);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [inputFileString, setInputFileString] = useState<string | null>(null);
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [rank, setRank] = useState<number | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const url = new URL(window.location.href);
  const roomID = url.searchParams.get("roomID");
  const roomIDNum = Number(roomID);
  const userID = url.searchParams.get("userID");
  const userIDNum = Number(userID);

  const color = "#ffff00";

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

    fetch("https://picolor-backend-python.onrender.com/controller/image", {
      method: "POST",
      body: JSON.stringify({
        userID: userIDNum,
        colorID: 68,
        image: base64ImageString,
      }),
    })
      .then(async (res) => {
        setIsJudging(false);
        if (!res.ok) {
          messageApi.error(res.statusText);
          setInputFileString(null);
          setInputFile(null);
          setRank(null);
          return;
        }

        const data = await res.json();
        console.log(data);
        if (data.is_success === undefined) {
          messageApi.error("is_success is undefined");
          setInputFileString(null);
          setInputFile(null);
          setRank(null);
          return;
        }
        if (data.is_success) {
          setRank(data.rank);
          messageApi.success("色の判定が完了しました！");
          return;
        } else {
          setInputFileString(null);
          setInputFile(null);
          setRank(null);
          messageApi.error(data.error);
          return;
        }
      })
      .catch((err) => {
        setIsJudging(false);
        messageApi.error(err);
        setInputFileString(null);
        setInputFile(null);
        setRank(null);
      });
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
      {contextHolder}
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
              background: `linear-gradient(to bottom, transparent 45%, ${color} 50%, transparent 55%)`,
              animation: "radar-scan 4s linear infinite",
              opacity: isJudging ? "1" : "0",
            })}
          />
        </div>
      )}
    </Form>
  );
}

export default ControllerPlayingPlaying;
