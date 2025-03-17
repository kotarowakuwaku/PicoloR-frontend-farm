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
  const [url] = useState<string>(`http://localhost:9000/PicoloR-frontend-farm/room/${roomId}`);

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
            if(payload.new?.room_id === Number(roomId)) {
              const { data: newMember, error } = await supabase
                .from("users")
                .select("name")
                .eq("id", payload.new.user_id)
                .single()

                console.log(newMember);
              if (error) {
                console.error(error);
              } else if (newMember) {
                setMembers([...members, newMember.name]);
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

  const onClickGameStart = () => {
    window.location.href = `/PicoloR-frontend-farm/room/${roomId}/hostUser`;
  }

  return (
    <>
      <Header mode={HeaderMode.GREEN} />
      <div className={css({ mt: "90px" })}>
        <h1 className={flex({
          display: "flex",
          justify: "center",
          fontSize: "2.5rem",
          fontFamily: "M PLUS 1p",
          color: "#4A4747"
        })}>
          スマホでQRを読み取って参加しよう！
        </h1>
        <div className={flex({ display: "flex", w: "100%", justify: "center", mt: "25px" })}>
          <div className={flex({ display: "flex", justify: "center", align: "center", mt: "20px", w: "40%", h: "100%" })}>
            <QRCode url={url} />
          </div>
          <div className={flex({ width: "40%" })}>
            <BoxBorderedContainerWithTitle title="参加者一覧">
              {members.length > 0 && (
                <div className={flex({ display: "flex", justify: "center", fontSize: "3rem" })}>
                  {members.length}人
                </div>
              )}
              <ul className={flex({ p: "5px 20px", display: "flex", flexWrap: "wrap", listStyle: "none" })}>
                {members.map((member) => (
                  <li key={member} className={css({ display: "inline", p: "5px 20px", fontSize: "1rem" })}>
                    {member}
                  </li>
                ))}
              </ul>
            </BoxBorderedContainerWithTitle>
          </div>
        </div>
        <div className={flex({ display: "flex", justify: "center", m: "0 auto", mt: "20px", w: "480px", h: "83px" })}>
          <Button type={ButtonMode.GREEN} text="GAME START" onClick={onClickGameStart}/>
        </div>
      </div>
    </>
  );
}
