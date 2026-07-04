import React from 'react'
import './DeskUI.css'
import Button from './button'
import iconHistory from '../assets/images/icon_history.svg'
import iconCart from '../assets/images/icon_cart.svg'


const buttonWidth = 280
const buttonHeight = 100

type DeskUIProps = {
    bottom?: number
}

export const DeskUI = ({ bottom = 0 }: DeskUIProps) => {
    return (
        <div
            className='desk-ui'
            style={{ '--desk-side-bottom': `${bottom}px` } as React.CSSProperties}
        >
            <div className='desk-top'></div>
            <div className='desk-side'>
                <Button
                    text='注文履歴'
                    width={buttonWidth}
                    height={buttonHeight}
                    iconSrc={iconHistory}
                    backgroundColor='#FF9A9A'
                    iconSize={70}
                    onClick={() => {}}
                />
                <div className='desk-hint'>
                    スムージーの種類を選択してください
                    <br />
                    種類によって選べる具材が変わります
                </div>
                <Button
                    text='注文確認'
                    width={buttonWidth}
                    height={buttonHeight}
                    iconSrc={iconCart}
                    backgroundColor='#ACD7FF'
                    iconSize={110}
                    onClick={() => {}}
                />
            </div>
        </div>
    )
}