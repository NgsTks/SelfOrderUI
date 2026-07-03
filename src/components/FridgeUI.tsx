import './Fridge.css'
import type { CSSProperties } from 'react'

type FridgeUIProps = {
    x: number
    y: number
    width: number
    height: number
    zIndex?: number
    backgroundColor?: string
    borderColor?: string
    highlightColor?: string

    // 取っ手
    handleColor?: string
    handleWidth?: number
    handleHeight?: number
    handleTop?: number
    handleRight?: number
    handleRadius?: number

    // 黄色い横線
    accentLineColor?: string
    accentLineHeight?: number
    accentLineTop?: number

    className?: string
}

export const FridgeUI = ({
    x,
    y,
    width,
    height,
    zIndex = 0,
    backgroundColor = '#D7F0EE',
    borderColor = '#F6FFFD',
    highlightColor = 'rgba(255, 255, 255, 0.45)',
    handleColor = '#F5F5F5',
    handleWidth = 36,
    handleHeight = 180,
    handleTop = 100,
    handleRight = 28,
    handleRadius = 18,
    accentLineColor = '#FFF28A',
    accentLineHeight = 4,
    accentLineTop = 54,
    className = '',
}: FridgeUIProps) => {
    const style = {
        left: x,
        top: y,
        width,
        height,
        zIndex,
        backgroundColor,
        borderColor,
        '--fridge-highlight-color': highlightColor,
        '--fridge-handle-color': handleColor,
        '--fridge-handle-width': `${handleWidth}px`,
        '--fridge-handle-height': `${handleHeight}px`,
        '--fridge-handle-top': `${handleTop}px`,
        '--fridge-handle-right': `${handleRight}px`,
        '--fridge-handle-radius': `${handleRadius}px`,
        '--fridge-accent-line-color': accentLineColor,
        '--fridge-accent-line-height': `${accentLineHeight}px`,
        '--fridge-accent-line-top': `${accentLineTop}px`,
    } as CSSProperties

    return (
        <div className={`fridge-ui ${className}`.trim()} style={style} aria-hidden='true'>
            <div className='fridge-ui__accent-line' />
            <div className='fridge-ui__handle' />
            <div className='fridge-ui__shine' />
        </div>
    )
}