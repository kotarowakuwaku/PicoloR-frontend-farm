import React from 'react'
import Header from './components/Header'
import { HeaderMode } from './types/HeaderMode'
import Button from './components/Button'
import { ButtonMode } from './types/ButtonMode'
import { css } from '../styled-system/css'
import { flex } from '../styled-system/patterns'

export function Result() {
    return (
        <>
            <Header mode={HeaderMode.GRAY} />
            <div className={flex({
                mt: "90px",
                w: "100vw",
                display: "flex",
                justify: "center",
            })}>
                <ul className={flex({
                    display: "flex",
                    justify: "space-between",
                    align: "center",
                    bgColor: "white",
                    w: "80%",
                    h: "166px",
                    borderRadius: "56px",

                })}>
                    <li >
                        <ul className={flex({
                            display: "flex",
                            justify: "space-around",
                            ml: "20px",
                        })}>
                            <li className={css({
                                w: "70%",
                            })}>
                                <img src="/first_place.png" alt="" className={css({
                                    w: "80%",
                                })} />
                            </li>
                            <li className={flex({
                                display: "flex",
                                align: "center", // 上下中央寄せ
                            })}>
                                <span className={css({
                                    fontSize: "2rem",
                                })}>しょ</span>
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
                                })}>0:59</span>
                            </li>
                            <li className={css({
                                w: "40%",
                            })}>
                                <img src="/palette.svg" alt="" className={css({

                                })} />
                            </li>
                        </ul>
                    </li>
                </ul>
                {/* <div>
                    <img src="/second_place.png" alt="" />
                    <span>yuka</span>
                    <span>1:43</span>
                    <img src="" alt="" />
                </div>
                <div>
                    <img src="/third_place.png" alt="" />
                    <span>太一</span>
                    <span>4:01</span>
                    <img src="" alt="" />
                </div> */}
            </div>
            <div>
                <Button type={ButtonMode.GREEN} text="もう一度遊ぶ" />
                <Button type={ButtonMode.GRAY} text="HOMEへ戻る" />
            </div>
        </>
    )
}
