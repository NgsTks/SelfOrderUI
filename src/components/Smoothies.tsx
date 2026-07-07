import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SmoothieUI } from './SmoothieUI'
import imageUrlGoro from '../assets/images/zai_brube.png'

const w = 1920
const h = 1080
const smoothieW = 400
const smoothieH = 670
const smoothieOffsetY = -360
const smoothieIntervalX = smoothieW * 1.25
const deskBottom = 0

type Phase = 'idle' | 'centering' | 'exiting'

interface SmoothiesProps {
    isMoved: boolean
    startTransition: (index: 0 | 1 | 2) => void
}

export const Smoothies = ({ isMoved, startTransition }: SmoothiesProps) => {
    const [pressedIndex, setPressedIndex] = useState<0 | 1 | 2 | null>(null)
    const [phase, setPhase] = useState<Phase>('idle')

    const smoothieX2 = w / 2 - smoothieW / 2
    const smoothieX1 = smoothieX2 - smoothieIntervalX
    const smoothieX3 = smoothieX2 + smoothieIntervalX

    const smoothieY2 = h / 2 + smoothieOffsetY + 40 - deskBottom

    useEffect(() => {
        if (pressedIndex === null) return

        const timer = window.setTimeout(() => {
            setPhase('exiting')
        }, 600)

        return () => window.clearTimeout(timer)
    }, [pressedIndex])

    const smoothies = [
        {
            title: 'さっぱりスムージー',
            description: '手ごろな価格で\n好みの味に!',
            liquidColor: '#FFD7A0',
            x: smoothieX1,
            y: h / 2 + smoothieOffsetY - deskBottom,
            delay: 0,
            index: 0 as const,
        },
        {
            title: 'しっとりスムージー',
            description: '選択肢広がる\n安定のコース',
            liquidColor: '#FDFD96',
            x: smoothieX2,
            y: smoothieY2,
            delay: 0.03,
            index: 1 as const,
        },
        {
            title: 'ごろごろスムージー',
            description: '贅沢果実で\nリッチな味わい!',
            liquidColor: '#dced9b',
            x: smoothieX3,
            y: h / 2 + smoothieOffsetY - deskBottom,
            delay: 0.06,
            index: 2 as const,
        },
    ]

    return (
        <>
            {smoothies.map((item) => {
                const isSelected = pressedIndex === item.index

                let animateTarget: { x: number; y?: number; opacity: number }

                if (!isMoved) {
                    animateTarget = { x: 0, y: 0, opacity: 1 }
                } else if (isSelected && phase === 'centering') {
                    animateTarget = {
                        x: smoothieX2 - item.x,
                        y: smoothieY2 - item.y,
                        opacity: 1,
                    }
                } else {
                    animateTarget = { x: -w, opacity: 1 }
                }

                return (
                    <motion.div
                        key={item.title}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            zIndex: 20,
                            pointerEvents: 'none',
                        }}
                        animate={animateTarget}
                        transition={{
                            duration: isSelected && phase === 'centering' ? 0.45 : 0.5,
                            ease: 'easeInOut',
                            delay:
                                isSelected && phase === 'exiting'
                                    ? item.delay + 0.2
                                    : item.delay,
                        }}
                    >
                        <SmoothieUI
                            title={item.title}
                            description={item.description}
                            imageUrl={imageUrlGoro}
                            liquidColor={item.liquidColor}
                            x={item.x}
                            y={item.y}
                            onPush={() => {
                                if (pressedIndex !== null) return
                                setPressedIndex(item.index)
                                setPhase('centering')
                                startTransition(item.index)
                            }}
                            width={smoothieW}
                            height={smoothieH}
                        />
                    </motion.div>
                )
            })}
        </>
    )
}