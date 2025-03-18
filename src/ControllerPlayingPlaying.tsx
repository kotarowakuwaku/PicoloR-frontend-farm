import { Form, message } from "antd";
import { css } from "../styled-system/css";
import { useEffect, useState } from "react";
import ThemeColor from "./types/ThemeColor";
import ColorInputCircle from "./components/ColorInputCircle";

function ControllerPlayingPlaying({
  themeColors,
}: {
  themeColors: ThemeColor[];
}) {
  const [isJudging, setIsJudging] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ThemeColor | null>(null);
  const [inputFileString, setInputFileString] = useState<string | null>(null);
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [rank, setRank] = useState<number | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const url = new URL(window.location.href);
  const roomID = url.searchParams.get("roomID");
  const roomIDNum = Number(roomID);
  const userID = url.searchParams.get("userID");
  const userIDNum = Number(userID);

  const compressImage = (
    file: File,
    maxWidth: number,
    maxHeight: number,
    quality: number
  ) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Canvas is not supported"));
            return;
          }

          // アスペクト比を保持してリサイズ
          let width = img.width;
          let height = img.height;
          if (width > maxWidth || height > maxHeight) {
            const scale = Math.min(maxWidth / width, maxHeight / height);
            width = Math.round(width * scale);
            height = Math.round(height * scale);
          }

          // Canvasサイズを調整して描画
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          // JPEGで圧縮（quality: 0.7 = 70%）
          resolve(canvas.toDataURL("image/jpeg", quality));
        };
      };
      reader.onerror = reject;
    });
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!selectedColor) {
      messageApi.error("色の選択に失敗しました");
      return;
    }

    setInputFile(file);
    setInputFileString(URL.createObjectURL(file));
    setIsJudging(true);

    console.log("file", file);

    const compressedBase64 = await compressImage(file, 800, 800, 0.7);
    const base64ImageString = compressedBase64.split(",")[1];

    fetch("https://picolor-backend-python.onrender.com/controller/image", {
      method: "POST",
      body: JSON.stringify({
        roomID: roomIDNum,
        userID: userIDNum,
        colorID: selectedColor.ColorId,
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
          {themeColors.map((themeColor) => (
            <ColorInputCircle
              key={themeColor.ColorId}
              color={themeColor}
              onClick={() => setSelectedColor(themeColor)}
            />
          ))}
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
            style={{
              background: `linear-gradient(to bottom, transparent 45%, ${
                selectedColor ? selectedColor.ColorCode : "white"
              } 50%, transparent 55%)`,
            }}
            className={css({
              position: "absolute",
              bottom: "0",
              left: "0",
              right: "0",
              h: "100%",
              w: "100%",
              animation: "radar-scan 2s linear infinite",
              opacity: isJudging ? "1" : "0",
            })}
          />
        </div>
      )}
    </Form>
  );
}

export default ControllerPlayingPlaying;
