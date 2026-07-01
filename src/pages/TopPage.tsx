import './TopPage.css'
import { useState } from 'react'
import { SmoothieUI } from '../components/SmoothieUI'
import { DeskUI } from '../components/DeskUI'
import { HeadCounter } from '../components/HeadCounter'
import imageUrlGoro from '../assets/images/zai_brube.png'
import { MixerUI } from '../components/MixerUI'

const w = 1920
const h = 1080
const smoothieOffsetX = -200
const smoothieIntervalX = 500

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

    const smoothieX1 = smoothieIntervalX * 1 + smoothieOffsetX
    const smoothieX2 = smoothieIntervalX * 2 + smoothieOffsetX
    const smoothieX3 = smoothieIntervalX * 3 + smoothieOffsetX
    const counterOffsetX = (340-230)/2 - 200

    return (
        <div className='bg' style={style}>
            <HeadCounter
                x={200}
                y={0}
                items={[
                    { x: smoothieX1 + counterOffsetX, color: '#FFD7A0', count: counts[0] },
                    { x: smoothieX2 + counterOffsetX, color: '#FDFD96', count: counts[1] },
                    { x: smoothieX3 + counterOffsetX, color: '#dced9b', count: counts[2] },
                ]}
            />

            <div>
                <SmoothieUI
                    title="さっぱりスムージー"
                    description="贅沢果実で
リッチな味わい!"
                    imageUrl={imageUrlGoro}
                    liquidColor="#FFD7A0"
                    x={smoothieX1}
                    y={h / 2 - 280}
                    onPush={() => addCount(0)}
                />
            </div>
            <div>
                <SmoothieUI
                    title="しっとりスムージー"
                    description="贅沢果実で
リッチな味わい!"
                    imageUrl={imageUrlGoro}
                    liquidColor="#FDFD96"
                    x={smoothieX2}
                    y={h / 2 - 230}
                    onPush={() => addCount(1)}
                />
            </div>
            <div>
                <SmoothieUI
                    title="ごろごろスムージー"
                    description="贅沢果実で
リッチな味わい!"
                    imageUrl={imageUrlGoro}
                    liquidColor="#dced9b"
                    x={smoothieX3}
                    y={h / 2 - 280}
                    onPush={() => addCount(2)}
                />
            </div>

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