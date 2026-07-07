import './TopPage.css'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { DeskUI } from '../components/DeskUI'
import { HeadCounter } from '../components/HeadCounter'
import { MixerUI } from '../components/MixerUI'
import { FridgeUI } from '../components/FridgeUI'
import { Smoothies } from '../components/Smoothies'

const w = 1920
const h = 1080

type SceneState = 'idle' | 'transition' | 'settled'

export const TopPage = ({ themeColor = '#F4EED3' }) => {
    const style = { '--bg-color': themeColor } as React.CSSProperties
    const [counts, setCounts] = useState<[number, number, number]>([0, 0, 0])
    const [scene, setScene] = useState<SceneState>('idle')
    const [fridgeOnTop, setFridgeOnTop] = useState(false)

    const addCount = (index: 0 | 1 | 2) => {
        setCounts((prev) => {
            const next: [number, number, number] = [...prev] as [number, number, number]
            next[index] += 1
            return next
        })
    }

    const startTransition = (index: 0 | 1 | 2) => {
        if (scene !== 'idle') return

        addCount(index)
        setFridgeOnTop(false)
        setScene('transition')

        window.setTimeout(() => {
            setScene('settled')
        }, 2000)

        window.setTimeout(() => {
            setFridgeOnTop(true)
        }, 1200)
    }

    const smoothieW = 400
    const smoothieIntervalX = smoothieW * 1.25
    const headCounterCardWidth = 230
    const fridgeWidth = 1450
    const fridgeHeight = 900
    const deskBottom = 0
    const smoothieX2 = w / 2 - smoothieW / 2
    const smoothieX1 = smoothieX2 - smoothieIntervalX
    const smoothieX3 = smoothieX2 + smoothieIntervalX
    const counterOffsetX = (smoothieW - headCounterCardWidth) / 2 - 200

    const isMoved = scene !== 'idle'
    const isSettled = scene === 'settled'

    const fridgeScaleBack = 0.35
    const fridgeScaleFront = 1

    return (
        <div className='bg' style={style}>

            <motion.div
                style={{ position: 'absolute', inset: 0, zIndex: 30, pointerEvents: 'none' }}
                animate={isMoved ? { x: -w, opacity: 1 } : { x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
                <HeadCounter
                    y={0}
                    cardWidth={headCounterCardWidth}
                    items={[
                        { x: smoothieX1 + counterOffsetX, color: '#FFD7A0', count: counts[0] },
                        { x: smoothieX2 + counterOffsetX, color: '#FDFD96', count: counts[1] },
                        { x: smoothieX3 + counterOffsetX, color: '#dced9b', count: counts[2] },
                    ]}
                />
            </motion.div>

            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: fridgeOnTop ? 25 : -1,
                    pointerEvents: 'none',
                    transformOrigin: 'center center',
                }}
                animate={
                    scene === 'idle'
                        ? {
                            scale: fridgeScaleBack,
                            x: 0,
                            y: 0,
                            opacity: 1,
                        }
                        : {
                            scale: fridgeScaleFront,
                            x: -205,
                            y: [0, -260, -50],
                            opacity: 1,
                        }
                }
                transition={{
                    duration: 1.2,
                    delay: scene === 'idle' ? 0 : 1.0,
                    times: [0, 0.35, 0.7, 1],
                    ease: 'easeOut',
                }}
            >
                <FridgeUI
                    x={w / 2 - fridgeWidth / 2}
                    y={h / 2 - fridgeHeight / 2}
                    width={fridgeWidth}
                    height={fridgeHeight}
                    isDoorOpen={fridgeOnTop}
                    isButtonsVisible={isSettled}
                />
            </motion.div>

            <Smoothies isMoved={isMoved} startTransition={startTransition} />

            <motion.div
                style={{ position: 'absolute', inset: 0, zIndex: 15, pointerEvents: 'none' }}
                animate={isMoved ? { y: 230, opacity: 1 } : { y: 0, opacity: 1 }}
            >
                    <motion.div
                        style={{ position: 'absolute', inset: 0, zIndex: 15, pointerEvents: 'none' }}
                        animate={isMoved ? { x: -w, opacity: 1 } : { x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                    >
                        <MixerUI color={'#FFBB9E'} x={-280} y={-200 - deskBottom} interactive={false}></MixerUI>
                    </motion.div>

                    <motion.div
                        style={{ position: 'absolute', inset: 0, zIndex: 18, pointerEvents: 'none' }}
                        animate={isMoved ? { x: -310, opacity: 1 } : { x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                    >
                        <MixerUI color={'#C8FFEA'} x={w - 100} y={-200 - deskBottom} interactive={isSettled}></MixerUI>
                    </motion.div>

                <div style={{ pointerEvents: 'none' }}>
                    <DeskUI bottom={deskBottom}></DeskUI>
                </div>
            </motion.div>
        </div>
    )
}