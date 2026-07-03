import './TopPage.css'
import { useState } from 'react'
import { SmoothieUI } from '../components/SmoothieUI'
import { DeskUI } from '../components/DeskUI'
import { HeadCounter } from '../components/HeadCounter'
import imageUrlGoro from '../assets/images/zai_brube.png'
import { MixerUI } from '../components/MixerUI'
import Button from '../components/button'
import { FridgeUI } from '../components/FridgeUI'

const w = 1920
const h = 1080
const smoothieW = 400
const smoothieH = 670
const smoothieOffsetY = -360
const smoothieIntervalX = smoothieW * 1.25
const headCounterCardWidth = 230
const fridgeWidth = 580
const fridgeHeight = 366

export const TopPage = ({ themeColor = '#F4EED3' }) => {
    const style = { '--bg-color': themeColor } as React.CSSProperties
    const [counts, setCounts] = useState<[number, number, number]>([0, 0, 0])

    const addCount = (index: 0 | 1 | 2) => {
        setCounts((prev) => {
            const next: [number, number, number] = [...prev] as [number, number, number]
            next[index] += 1
            return next
        })
    }

    const smoothieX2 = w / 2 - smoothieW / 2
    const smoothieX1 = smoothieX2 - smoothieIntervalX
    const smoothieX3 = smoothieX2 + smoothieIntervalX
    const counterOffsetX = (smoothieW - headCounterCardWidth) / 2 - 200
    const buttonOffsetX = -105

    return (
        <div className='bg' style={style}>
            <Button text='注文履歴' x={200 + buttonOffsetX} y={h - 115} backgroundColor='#FF9A9A' onClick={() => {}} />
            <Button text='注文確認' x={w - 200 + buttonOffsetX} y={h - 115} backgroundColor='#ACD7FF' onClick={() => {}} />

            <HeadCounter
                y={0}
                cardWidth={headCounterCardWidth}
                items={[
                    { x: smoothieX1 + counterOffsetX, color: '#FFD7A0', count: counts[0] },
                    { x: smoothieX2 + counterOffsetX, color: '#FDFD96', count: counts[1] },
                    { x: smoothieX3 + counterOffsetX, color: '#dced9b', count: counts[2] },
                ]}
            />

            {/* スムージーの奥に置く薄い青の箱 */}
            <FridgeUI x={w / 2 - fridgeWidth / 2} y={h / 2 - fridgeHeight / 2} width={fridgeWidth} height={fridgeHeight} zIndex={-1} />

            <SmoothieUI
                title='さっぱりスムージー'
                description='手ごろな価格で
好みの味に!'
                imageUrl={imageUrlGoro}
                liquidColor='#FFD7A0'
                x={smoothieX1}
                y={h / 2 + smoothieOffsetY}
                onPush={() => addCount(0)}
                width={smoothieW}
                height={smoothieH}
            />
            <SmoothieUI
                title='しっとりスムージー'
                description='選択肢広がる
安定のコース'
                imageUrl={imageUrlGoro}
                liquidColor='#FDFD96'
                x={smoothieX2}
                y={h / 2 + smoothieOffsetY + 40}
                onPush={() => addCount(1)}
                width={smoothieW}
                height={smoothieH}
            />
            <SmoothieUI
                title='ごろごろスムージー'
                description='贅沢果実で
リッチな味わい!'
                imageUrl={imageUrlGoro}
                liquidColor='#dced9b'
                x={smoothieX3}
                y={h / 2 + smoothieOffsetY}
                onPush={() => addCount(2)}
                width={smoothieW}
                height={smoothieH}
            />

            <div>
                <MixerUI color={'#C8FFEA'} x={w - 100} y={-200}></MixerUI>
                <MixerUI color={'#FFBB9E'} x={-280} y={-200}></MixerUI>
            </div>
            <div style={{ position: 'absolute', bottom: 0, zIndex: -1 }}>
                <DeskUI></DeskUI>
            </div>
        </div>
    )
}