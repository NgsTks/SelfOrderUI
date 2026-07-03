import './HeadCounter.css'
import type { CSSProperties } from 'react'

type CounterItem = {
    x: number
    color: CSSProperties['backgroundColor']
    count: number
}

interface HeadCounterProps {
    x?: number
    y?: number
    cardWidth?: number | string
    items: [CounterItem, CounterItem, CounterItem]
}

export const HeadCounter = ({ x = 0, y = 0, cardWidth = 230, items }: HeadCounterProps) => {
    const headCardWidth = typeof cardWidth === 'number' ? `${cardWidth}px` : cardWidth

    const style = {
        //'--head-left': `${x}px`,
        '--head-top': `${y}px`,
        '--head-card-width': headCardWidth,
    } as CSSProperties

    return (
        <div className="head-counter-wrap" style={style}>
            {items.map((item, i) => (
                <div
                    className="head-counter-card"
                    key={i}
                    style={{ left: `${item.x}px` }}
                >
                    <div style={{ flexDirection: 'column' }}>
                        <div className="mini-glass" style={{ flexDirection: 'column' }}>
                            <div
                                className="mini-liquid"
                                style={{ backgroundColor: item.color }}
                            />
                        </div>
                        <div className="mini-base" />
                    </div>
                    <span className="head-counter-x">×</span>
                    <span className="head-counter-num">{item.count}</span>
                </div>
            ))}
        </div>
    )
}