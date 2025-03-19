import React from 'react'
import { flex } from '../../styled-system/patterns/flex'
import { css } from '../../styled-system/css'
import RankBarProps from '../types/RankBar'
import first_place from "../assets/first_place.png";
import second_place from "../assets/second_place.png";
import third_place from "../assets/third_place.png";

const RankBar: React.FC<RankBarProps> = ({
    Color,
    Rank,
    UserName,
    PostedTime,
    imageURL,
}) => {
    const rankImage = () => {
        switch (Rank) {
            case 1:
                return first_place
            case 2:
                return second_place
            case 3:
                return third_place
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
                    backgroundColor: Color
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
                            })}>{UserName}</span>
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
                            })}>{PostedTime}</span>
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