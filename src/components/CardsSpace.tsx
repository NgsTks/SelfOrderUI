import type { CSSProperties } from 'react'
import './CardsSpace.css'
import OsusumeCard from './OsusumeCard'
import Card from './Card'
import { OrderProvider } from '../contexts/OrderContext'

type CardsSpaceItem = {
    image: string
    name: string
    price: number | string
    bottomColor?: string // OsusumeCard用
    color?: string // Card用
    quantity?: number // Card用
    x?: number
    y?: number
}

type CardsSpaceProps = {
    cards: CardsSpaceItem[]
    layout?: 'single-row' | 'double-row'
    className?: string
}

export const CardsSpace: React.FC<CardsSpaceProps> = ({
    cards,
    layout = 'single-row',
    className = '',
}) => {
    return (
            <div className={`cards-space cards-space--${layout} ${className}`.trim()}>
                {cards.map((item, index) => (
                    <div className='cards-space__item' key={`${item.name}-${index}`}>
                        {layout === 'single-row' ? (
                            <OsusumeCard
                                image={item.image}
                                name={item.name}
                                price={item.price}
                                bottomColor={item.bottomColor}
                                x={item.x}
                                y={item.y}
                                ingredients={item as any} // 型の互換性のためにanyを使用
                            />
                        ) : (
                            <Card
                                id={`${item.name}-${index}`}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                                color={item.color ?? item.bottomColor}
                                quantity={item.quantity ?? 0}
                            />
                        )}
                    </div>
                ))}
            </div>
    )
}

export default CardsSpace