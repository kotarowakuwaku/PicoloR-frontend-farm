import { useEffect, useState } from 'react'
import { supabase } from "./supabase/supabase";

export function Test () {
    const url = new URL(window.location.href);
    const roomID = url.searchParams.get("roomId");
    const roomIDNum = Number(roomID);
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [isEnded, setIsEnded] = useState<boolean>(false);
    useEffect(() => {
        const channel = supabase
          .channel("table_rooms_db_changes")
          .on(
            "postgres_changes",
            {
              event: "UPDATE",
              schema: "public",
              table: "rooms",
            },
            async (payload) => {
                console.log(payload);
              if (payload.eventType === "UPDATE") {
                if (payload.new?.id === roomIDNum) {
                    setIsStarted(payload.new?.is_start);
                    setIsEnded(payload.new?.is_finish);
                }
              }
            }
          )
          .subscribe();
    
        return () => {
          channel.unsubscribe();
        };
      }, []);

        return (

            <>
                <div>test</div>
                <div>
                    {isStarted ? "ゲームが開始されました" : "ゲームはまだ開始されていません"}
                    <br />
                    {isEnded ? "ゲームが終了しました" : "ゲームはまだ終了していません"}
                </div>
            </>
        )
    }