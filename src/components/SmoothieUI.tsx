import './SmoothieUI.css'
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'

interface SmoothieProps {
    x?: number
    y?: number
    width?: number | string
    height?: number | string
    title: string
    description: string
    imageUrl: string
    liquidColor: CSSProperties['backgroundColor']
    onPush?: () => void
}

type Ripple = {
    id: number
    left: number
    top: number
    scale: number
    delay: number
}

export const SmoothieUI = (props: SmoothieProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [ripples, setRipples] = useState<Ripple[]>([])

    const smoothieWidth = typeof props.width === 'number' ? `${props.width}px` : props.width ?? '340px'
    const smoothieHeight = typeof props.height === 'number' ? `${props.height}px` : props.height ?? '560px'

    const style = {
        '--li-color': props.liquidColor || '#C8FFEA',
        '--ripple-color': props.liquidColor || '#C8FFEA',
        '--img-url': `url(${props.imageUrl})`,
        '--smoothie-left': `${props.x ?? 0}px`,
        '--smoothie-top': `${props.y ?? 0}px`,
        '--smoothie-width': smoothieWidth,
        '--smoothie-height': smoothieHeight,
    } as CSSProperties

    useEffect(() => {
        if (ripples.length === 0) return

        const timer = window.setTimeout(() => {
            setRipples([])
        }, 1800)

        return () => window.clearTimeout(timer)
    }, [ripples])

    const handlePush = () => {
        const rect = buttonRef.current?.getBoundingClientRect()
        if (rect) {
            const left = rect.left + rect.width / 2
            const top = rect.top + rect.height / 2

            const maxX = Math.max(left, window.innerWidth - left)
            const maxY = Math.max(top, window.innerHeight - top)
            const maxRadius = Math.hypot(maxX, maxY)

            const scale = maxRadius / 20 + 2

            setRipples([
                { id: Date.now(), left, top, scale, delay: 0 },
                { id: Date.now() + 1, left, top, scale, delay: 0.14 },
                { id: Date.now() + 2, left, top, scale, delay: 0.28 },
            ])
        }

        props.onPush?.()
    }

    return (
        <div className='smoothie-bg' style={style}>
            <div className='smoothie-liquid'>
                <div className='smoothie-straw'></div>

                <div className='smoothie-content'>
                    <p className='smoothie-title'>{props.title}</p>
                    <p className='smoothie-description'>{props.description}</p>

                    <button ref={buttonRef} type='button' className='smoothie-push-btn' onClick={handlePush}>
                        {ripples.map((ripple) => (
                            <motion.span
                                key={ripple.id}
                                className='smoothie-ripple-motion'
                                style={
                                    {
                                        left: ripple.left,
                                        top: ripple.top,
                                        '--ripple-color': props.liquidColor,
                                    } as CSSProperties
                                }
                                initial={{ scale: 0.08, opacity: 0.7 }}
                                animate={{ scale: ripple.scale, opacity: 0 }}
                                transition={{
                                    duration: 1.15,
                                    ease: 'easeOut',
                                    delay: ripple.delay,
                                }}
                            />
                        ))}

                        <div className='smoothie-push-core'>
                            <div className='smoothie-image'></div>
                            <div className='smoothie-push-overlay'>
                                <span>PUSH</span>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}