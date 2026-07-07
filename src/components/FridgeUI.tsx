import './Fridge.css'
import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { Button } from './button'
import { CardsSpace } from './CardsSpace'
import { Products } from '../mocks/products'
import type { ProductCategory } from '../types/product'
import icon_recommend from '../assets/images/icon_recommend.svg'
import icon_fruits from '../assets/images/icon_fruits.svg'
import icon_vegetables from '../assets/images/icon_vegetables.svg'
import icon_others from '../assets/images/icon_others.svg'

type FridgeUIProps = {
    x: number
    y: number
    width: number
    height: number
    zIndex?: number
    backgroundColor?: string
    borderColor?: string
    highlightColor?: string
    isDoorOpen?: boolean
    isDoubleFloor?: boolean
    isButtonsVisible?: boolean
    accentLineColor?: string
    className?: string
}

type MenuKey = ProductCategory

const menuItems: Array<{ text: MenuKey; backgroundColor: string; iconSrc: string }> = [
    { text: 'おすすめ', backgroundColor: '#FFF28A', iconSrc: icon_recommend },
    { text: 'フルーツ', backgroundColor: '#F4CEFF', iconSrc: icon_fruits },
    { text: 'やさい', backgroundColor: '#DAFFAA', iconSrc: icon_vegetables },
    { text: 'その他', backgroundColor: '#f2f2f2', iconSrc: icon_others },
]

export const FridgeUI = ({
    x,
    y,
    width,
    height,
    zIndex = 0,
    backgroundColor = '#D7F0EE',
    borderColor = '#F6FFFD',
    isDoorOpen = false,
    isDoubleFloor = false,
    isButtonsVisible = false,
    accentLineColor = '#FFF28A',
    className = '',
}: FridgeUIProps) => {
    const [selectedMenu, setSelectedMenu] = useState<MenuKey>('おすすめ')
    const [displayedMenu, setDisplayedMenu] = useState<MenuKey>('おすすめ')
    const [isMenuSwitching, setIsMenuSwitching] = useState(false)
    const [showDoubleFloor, setShowDoubleFloor] = useState(false)
    const doorControls = useAnimationControls()
    const timersRef = useRef<ReturnType<typeof window.setTimeout>[]>([])

    const selectedItem = menuItems.find((item) => item.text === selectedMenu) ?? menuItems[0]
    const effectiveDoubleFloor = isDoubleFloor || showDoubleFloor

    const style = {
        left: x,
        top: y,
        width,
        height,
        zIndex,
        backgroundColor,
        borderColor,
        '--fridge-accent-line-color': accentLineColor,
    } as CSSProperties & Record<string, string | number>

    const clearTimers = () => {
        timersRef.current.forEach((timer) => window.clearTimeout(timer))
        timersRef.current = []
    }

    useEffect(() => {
        if (isMenuSwitching) {
            return
        }

        void doorControls.start(isDoorOpen ? 'open' : 'closed')
    }, [isDoorOpen, isMenuSwitching, doorControls])

    useEffect(() => {
        return () => {
            clearTimers()
        }
    }, [])

    const handleMenuSelect = async (menu: MenuKey) => {
        if (menu === selectedMenu || isMenuSwitching) {
            return
        }

        setIsMenuSwitching(true)
        setSelectedMenu(menu)

        await doorControls.start('closed')
        setDisplayedMenu(menu)
        setShowDoubleFloor(menu !== 'おすすめ')
        await doorControls.start('open')

        setIsMenuSwitching(false)
    }

    const cardsLayout = showDoubleFloor ? 'double-row' : 'single-row'

    return (
        <div className={`fridge-ui ${className}`.trim()} style={style} aria-hidden='true'>
            <motion.div
                className='buttons-container'
                initial={false}
                animate={{ opacity: isButtonsVisible ? 1 : 0 }}
                transition={{ duration: 0.4, delay: isButtonsVisible ? 0.3 : 0 }}
                style={{ pointerEvents: isMenuSwitching ? 'none' : 'auto' }}
            >
                {menuItems.map((item) => {
                    const isSelected = selectedMenu === item.text

                    return (
                        <div
                            key={item.text}
                            onClick={() => handleMenuSelect(item.text)}
                            role='button'
                            tabIndex={0}
                            aria-disabled={isMenuSwitching}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    void handleMenuSelect(item.text)
                                }
                            }}
                            style={{
                                cursor: isMenuSwitching ? 'default' : 'pointer',
                                transform: isSelected ? 'scale(1.04)' : 'scale(1)',
                                opacity: isSelected ? 1 : 0.92,
                            }}
                        >
                            <Button
                                text={item.text}
                                width={280}
                                height={100}
                                backgroundColor={item.backgroundColor}
                                iconSrc={item.iconSrc}
                            />
                        </div>
                    )
                })}
            </motion.div>

            <motion.div
                className='fridge-ui__accent-line'
                animate={{ backgroundColor: selectedItem.backgroundColor }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
            />

            <div className='fridge-space'>
                <div className='fridge-floor' />
                <motion.div
                    className='fridge-floor2'
                    animate={effectiveDoubleFloor ? { opacity: 1 } : { opacity: 0 }}
                    style={{ transformOrigin: 'top center', pointerEvents: 'none' }}
                >
                    <div className='fridge-floor2' />
                </motion.div>
                <CardsSpace
                    layout={cardsLayout}
                    cards={Products[displayedMenu]}
                />
            </div>

            <motion.div
                className='fridge-door'
                initial={false}
                animate={doorControls}
                variants={{
                    open: { scaleX: 0 },
                    closed: { scaleX: 1 },
                }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ transformOrigin: 'left center' }}
            >
                <div
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '43%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1,
                        pointerEvents: 'none',
                    }}
                >
                    <div style={{ scale: 3.6 }}>
                        <Button
                            text={selectedItem.text}
                            width={280}
                            height={100}
                            backgroundColor={selectedItem.backgroundColor}
                            iconSrc={selectedItem.iconSrc}
                        />
                    </div>
                </div>

                <div className='fridge-ui__handle' />
            </motion.div>
        </div>
    )
}