import './MixerUI.css';
// コンテナの座標、サイズのプロパティ
interface MixerUIProps {
    x?: number; // X座標（オプション）
    y?: number; // Y座標（オプション）
    width?: number; // 幅（オプション）
    height?: number; // 高さ（オプション）
    color?: string; // 色（オプション）
}

export const MixerUI = (props: MixerUIProps) => {
    // デフォルト値を設定しつつ、CSS変数として渡す
    const style: React.CSSProperties = {
        '--mixer-width': `${props.width || 380}px`,
        '--mixer-height': `${props.height || 1050}px`,
        '--mixer-stand-color': `${props.color || '#C8FFEA'}`,
        left: `${props.x || 0}px`,
        top: `${props.y || 0}px`,
    } as React.CSSProperties;

    return (
        <div>
            <div className="mixer-container" style={style}>
                <div className="mixer-cylinder"/>
                <div className="mixer-stand"/>
            </div>
        </div>
    );
};