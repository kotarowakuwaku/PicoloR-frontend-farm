import React from 'react'
import { flex } from '../../styled-system/patterns/flex'
import { css } from '../../styled-system/css'
import RankBarProps from '../types/RankBar'

const RankBar: React.FC<RankBarProps> = ({
    color,
    rank,
    name,
    time,
    imageURL,
}) => {
    const rankImage = () => {
        switch (rank) {
            case 1:
                return "/first_place.png"
            case 2:
                return "/second_place.png"
            case 3:
                return "/third_place.png"
            default:
                return ""
        }
    }

    return (
        <>
            <ul className={flex({
                display: "flex",
                justify: "space-between",
                align: "center",
                w: "100%",
                h: "130px",
                borderRadius: "56px",
            })}
                style={{
                    backgroundColor: color
                }}>
                <li >
                    <ul className={flex({
                        display: "flex",
                        justify: "space-around",
                        ml: "20px",
                    })}>
                        <li className={css({
                            w: "70%",
                        })}>
                            <img src={rankImage()} alt="" className={css({
                                w: "80%",
                            })} />
                        </li>
                        <li className={flex({
                            display: "flex",
                            align: "center", // 上下中央寄せ
                        })}>
                            <span className={css({
                                fontSize: "2rem",
                            })}>{name}</span>
                        </li>
                    </ul>
                </li>
                <li className={flex({
                    w: "30%",
                    display: "flex",
                    justify: "space-between",
                })}>
                    <ul className={flex({
                        display: "flex",
                        justify: "space-around",
                        align: "center",
                    })}>
                        <li>
                            <span className={css({
                                fontSize: "2rem",
                            })}>{time}</span>
                        </li>
                        <li className={css({
                            w: "40%",
                            transition: "transform 0.2s ease-in-out", // アニメーションを追加
                            "&:hover": {
                                transform: "scale(2)", // ホバー時に1.2倍に拡大
                            }
                        })}>
                            <img src={imageURL} alt="" />
                        </li>
                    </ul>
                </li>
            </ul>
        </>
    )
}

export default RankBar