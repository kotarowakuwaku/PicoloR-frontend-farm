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
    const [top3Players, setTop3players] = useState<RankBarProps[]>([]);

    useEffect(() => {
        const fetchResultData = async () => {
            try {
                const response = await fetch(
                    `https://picolor-backend-go.onrender.com/host/result?roomID=${roomId}`,
                    {
                        method: "GET",
                    }
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const resultData = await response.json();
                console.log(resultData);
                setTop3players(resultData.results.map((result: { Rank: number; UserName: string; PostedTime: string; Image: string; Color: string }) => {
                    const { Image, ...rest } = result;
                    const decoededImage = `data:image/jpeg;base64,${Image}`;
                    console.log({
                        ...rest,
                        Image: decoededImage,
                    })
                    return {
                        ...rest,
                        Image: decoededImage,
                    }
                }))
            } catch (err) {
                console.error("Fetch error:", err);
            }
        }

        fetchResultData();
    }, [roomId]);

    const onCliclkRetry = () => {
        const resetColorAndUser = async () => {
            try {
                const response = await fetch(
                    `https://picolor-backend-go.onrender.com/host/room/reset?roomID=${roomId}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                // window.location.href = `/PicoloR-frontend-farm/room/${roomId}`;
            }

        }

        resetColorAndUser();
    }
    const onClickHome = () => {
        const deleteRoom = async () => {
            try {
                // posts, room_members, roomColor
                const deleteUserColor = await fetch(
                    `https://picolor-backend-go.onrender.com/host/room/reset?roomID=${roomId}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (!deleteUserColor.ok) {
                    throw new Error(`HTTP error! status: ${deleteUserColor.status}`);
                }
                //rooms

            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                // window.location.href = `/PicoloR-frontend-farm/`;
                try {
                    const deleteRoom = await fetch(
                        `https://picolor-backend-go.onrender.com/host/room?roomID=${roomId}`,
                        {
                            method: "DELETE",
                        }
                    );
                    if (!deleteRoom.ok) {
                        throw new Error(`HTTP error! status: ${deleteRoom.status}`);
                    }
                } catch (err) {
                    console.error("Fetch error:", err);
                } finally {
                    // window.location.href = `/PicoloR-frontend-farm/`;
                }
            }
        }

            deleteRoom();
        }

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
                                    <RankBar key={player.Rank} {...player} />
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
                        <Button type={ButtonMode.GREEN} text="もう一度遊ぶ" onClick={onCliclkRetry} />
                    </div>
                    <div className={css({
                        w: "40%",
                        mr: "50px"
                    })}>
                        <Button type={ButtonMode.GRAY} text="HOMEへ戻る" onClick={onClickHome} />
                    </div>
                </div>
            </>
        )
    }
