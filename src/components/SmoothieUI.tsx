import './SmoothieUI.css'
import type { CSSProperties } from 'react'

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

export const SmoothieUI = (props: SmoothieProps) => {
    const smoothieWidth = typeof props.width === 'number' ? `${props.width}px` : props.width ?? '340px'
    const smoothieHeight = typeof props.height === 'number' ? `${props.height}px` : props.height ?? '560px'

    const style = {
        '--li-color': props.liquidColor || '#C8FFEA',
        '--img-url': `url(${props.imageUrl})`,
        '--smoothie-left': `${props.x ?? 0}px`,
        '--smoothie-top': `${props.y ?? 0}px`,
        '--smoothie-width': smoothieWidth,
        '--smoothie-height': smoothieHeight,
    } as CSSProperties

    return (
        <div className='smoothie-bg' style={style}>
            <div className="smoothie-liquid">
                <div className="smoothie-straw"></div>

                <div className="smoothie-content">
                    <p className="smoothie-title">{props.title}</p>
                    <p className="smoothie-description">{props.description}</p>

                    <button className="smoothie-push-btn" onClick={props.onPush}>
                        <div className="smoothie-image"></div>
                        <div className="smoothie-push-overlay">
                            <span>PUSH</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}