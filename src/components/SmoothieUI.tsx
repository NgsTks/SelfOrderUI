import './SmoothieUI.css'
import type { CSSProperties } from 'react'

// コンポーネントのプロパティの型定義
interface SmoothieProps {
    x?: number; // X座標（オプション）
    y?: number; // Y座標（オプション）
    title: string;
    description: string;
    imageUrl: string;
    liquidColor: CSSProperties['backgroundColor'];
    onPush?: () => void; // PUSHボタンを押した時のアクション（オプション）
}

export const SmoothieUI = (props: SmoothieProps) => {
    const style: React.CSSProperties = {
        '--li-color': `${props.liquidColor || '#C8FFEA'}`,
        title: props.title,
        description: props.description,
        '--img-url': `url(${props.imageUrl})`,
        '--smoothie-left': `${props.x || 0}px`,
        '--smoothie-top': `${props.y || 0}px`,
    } as React.CSSProperties;

    return (
        <div className='smoothie-bg' style={style}>
            {/* 液体部分 */}
            <div className="smoothie-liquid">

                {/* ストロー（液体の手前、文字の奥に配置） */}
                <div className="smoothie-straw"></div>

                {/* コンテンツ部分 */}
                <div className="smoothie-content">

                    {/* タイトル */}
                    <h2 className="smoothie-title">{props.title}</h2>

                    {/* 概要 */}
                    <p className="smoothie-description">{props.description}</p>

                    {/* TODO:中央の写真付きPUSHボタンを押したときの処理の実装 */}
                    <button className="smoothie-push-btn" onClick={props.onPush}>
                        {/* 背景画像 */}
                        <div
                            className="smoothie-image"
                            
                        ></div>
                        {/* PUSHの半透明オーバーレイ */}
                        <div className="smoothie-push-overlay">
                            <span>PUSH</span>
                        </div>
                    </button>

                </div>
            </div>
        </div>
    )
}