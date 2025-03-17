import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import { HeaderMode } from './types/HeaderMode'
import Button from './components/Button'
import { ButtonMode } from './types/ButtonMode'
import { css } from '../styled-system/css'
import { flex } from '../styled-system/patterns'
import RankBar from './components/RankBar'
import RankBarProps from './types/RankBar'
import { useParams } from "react-router-dom"

export function Result() {
    const { roomId } = useParams<{ roomId: string }>();
    const [top3Players, setTop3players] = useState<RankBarProps[]>([
        { color: "#F32E2EAC", rank: 1, name: "こた", time: "1:23", imageURL: "/first_place.png" },
        { color: "#135FF7AC", rank: 2, name: "yuka", time: "1:43", imageURL: "/second_place.png" },
        { color: "#F38E30AC", rank: 3, name: "太一", time: "4:01", imageURL: "/third_place.png" },
    ]);

    useEffect(() => {
        const fetchResultData = async () => {
            try {
                const response = await fetch(
                    `https://picolor-backend-go.onrender.com/host/result?roomID=${roomId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const resultData = await response.json();
                console.log(resultData);
                setTop3players(resultData.results.map((result: { Rank: number; UserName: string; PostedTime: string; Image: string })=>{
                    return {
                        rank: result.Rank,
                        name: result.UserName,
                        time: result.PostedTime,
                        imageURL: `data:image/jpeg;base64,${result.Image}`,
                        color: "#F32E2EAC"
                    }
                }))
            } catch (err) {
                console.error("Fetch error:", err);
            }
        }
        
        fetchResultData();
    }, [roomId]); // roomIdを依存配列に追加

    return (
        <>
            <Header mode={HeaderMode.GRAY} />
            <div className={flex({
                mt: "90px",
                w: "100vw",
                display: "flex",
                justify: "center",
            })}>
                {top3Players && (
                    <ul className={css({
                        w: "80%",
                    })}>
                        {top3Players.map((player) => (
                            <li className={css({
                                m: "12px 0"
                            })}>
                                <RankBar key={player.rank} {...player} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className={flex({
                display: "flex",
                justify: "space-around",
                mt: "20px",
            })}>
                <div className={css({
                    w: "40%",
                    ml: "50px"
                })}>
                    <Button type={ButtonMode.GREEN} text="もう一度遊ぶ" />
                </div>
                <div className={css({
                    w: "40%",
                    mr: "50px"
                })}>
                    <Button type={ButtonMode.GRAY} text="HOMEへ戻る" />
                </div>
            </div>
        </>
    )
}
