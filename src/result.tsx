import React, { useState } from 'react'
import Header from './components/Header'
import { HeaderMode } from './types/HeaderMode'
import Button from './components/Button'
import { ButtonMode } from './types/ButtonMode'
import { css } from '../styled-system/css'
import { flex } from '../styled-system/patterns'
import RankBar from './components/RankBar'
import RankBarProps from './types/RankBar'

export function Result() {
    const [top3Players,] = useState<RankBarProps[]>([
        { color: "#F32E2EAC", rank: 1, name: "こた", time: "1:23", imageURL: "/first_place.png" },
        { color: "#135FF7AC", rank: 2, name: "yuka", time: "1:43", imageURL: "/second_place.png" },
        { color: "#F38E30AC", rank: 3, name: "太一", time: "4:01", imageURL: "/third_place.png" },
    ]);
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
                    w:"40%",
                    ml:"50px"
                })}>
                    <Button type={ButtonMode.GREEN} text="もう一度遊ぶ" />
                </div>
                <div className={css({
                    w:"40%",
                    mr:"50px"
                })}>
                    <Button type={ButtonMode.GRAY} text="HOMEへ戻る" />
                </div>
            </div>
        </>
    )
}
