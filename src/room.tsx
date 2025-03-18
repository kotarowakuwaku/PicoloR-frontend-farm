import { useEffect, useState } from "react";
import Header from "./components/Header";
import { HeaderMode } from "./types/HeaderMode";
import { css } from "../styled-system/css";
import { flex } from "../styled-system/patterns";
import { useParams } from "react-router-dom";
import Button from "./components/Button";
import { ButtonMode } from "./types/ButtonMode";
import QRCode from "./components/qrcode";
import BoxBorderedContainerWithTitle from "./components/BoxBorderedContainerWithTitle";
import { supabase } from "./supabase/supabase";

export function Rooms() {
  const { roomId } = useParams<{ roomId: string }>();
  const [members, setMembers] = useState<string[]>([]);
  const currentBaseURL = window.location.origin;

  const [url] = useState<string>(
    `${currentBaseURL}/PicoloR-frontend-farm/controller/join?roomID=${roomId}`
  );

  useEffect(() => {
    const fetchMembers = async () => {
      const { data: members, error } = await supabase
        .from("room_members")
        .select("user_id")
        .eq("room_id", roomId);
      if (error) {
        console.error(error);
      } else if (members) {
        const userIds = members.map((member) => member.user_id);
        const { data: users, error } = await supabase
          .from("users")
          .select("name")
          .in("id", userIds);
        if (error) {
          console.error(error);
        } else if (users) {
          const memberNames = users.map((user) => user.name);
          setMembers(memberNames);
        }
      }
    };

    fetchMembers();
  }, [roomId]);

  useEffect(() => {
    const channel = supabase
      .channel("table_member_db_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "room_members",
        },
        async (payload) => {
          if (payload.eventType === "INSERT") {
            console.log(payload);
            console.log(payload.new?.room_id);
            if (payload.new?.room_id === Number(roomId)) {
              const { data: newMember, error } = await supabase
                .from("users")
                .select("name")
                .eq("id", payload.new.user_id)
                .single();
              if (error) {
                console.error(error);
              } else if (newMember) {
                setMembers((prevMembers) => [...prevMembers, newMember.name]);
              }
            }
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const onClickGameStart = async () => {
    if (members.length < 2) {
      alert("2人以上でゲームを開始してください");
      return;
    }
    try {
      const response = await fetch(
        `https://picolor-backend-python.onrender.com/host/theme_color?roomID=${roomId}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      window.location.href = `/PicoloR-frontend-farm/room/${roomId}/hostUser`;
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  return (
    <>
      <Header mode={HeaderMode.GREEN} />
      <div className={css({ mt: "90px" })}>
        <h1
          className={flex({
            display: "flex",
            justify: "center",
            fontSize: "2.5rem",
            fontFamily: "M PLUS 1p",
            color: "#4A4747",
          })}
        >
          スマホでQRを読み取って参加しよう！
        </h1>
        <div
          className={flex({
            display: "flex",
            w: "100%",
            justify: "center",
            mt: "25px",
          })}
        >
          <div
            className={flex({
              display: "flex",
              justify: "center",
              align: "center",
              mt: "20px",
              w: "40%",
              h: "100%",
            })}
          >
            <QRCode url={url} />
          </div>
          <div className={flex({ width: "40%" })}>
            <BoxBorderedContainerWithTitle title="参加者一覧">
              <div
                className={flex({
                  display: "flex",
                  justify: "center",
                  fontSize: "3rem",
                })}
              >
                {members.length}人
              </div>
              <ul
                className={flex({
                  p: "5px 20px",
                  display: "flex",
                  flexWrap: "wrap",
                  listStyle: "none",
                })}
              >
                {members.map((member) => (
                  <li
                    key={member}
                    className={css({
                      display: "inline",
                      p: "5px 20px",
                      fontSize: "1rem",
                    })}
                  >
                    {member}
                  </li>
                ))}
              </ul>
            </BoxBorderedContainerWithTitle>
          </div>
        </div>
        <div
          className={flex({
            display: "flex",
            justify: "center",
            m: "0 auto",
            mt: "20px",
            w: "480px",
            h: "83px",
          })}
        >
          <Button
            type={ButtonMode.GREEN}
            text="GAME START"
            onClick={onClickGameStart}
          />
        </div>
      </div>
    </>
  );
}
