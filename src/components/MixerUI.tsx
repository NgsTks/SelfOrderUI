import './MixerUI.css';
import { motion } from 'framer-motion';
import { MixerIngredientItem } from './MixerIngredientItem';
import { useOrder } from "../contexts/OrderContext";

// コンテナの座標、サイズのプロパティ
interface MixerUIProps {
    x?: number; // X座標（オプション）
    y?: number; // Y座標（オプション）
    width?: number; // 幅（オプション）
    height?: number; // 高さ（オプション）
    color?: string; // 色（オプション）
    interactive?: boolean; // インタラクティブかどうか（オプション）
}

export const MixerUI = (props: MixerUIProps) => {
    const style: React.CSSProperties = {
        '--mixer-width': `${props.width || 380}px`,
        '--mixer-height': `${props.height || 1050}px`,
        '--mixer-stand-color': `${props.color || '#C8FFEA'}`,
        left: `${props.x || 0}px`,
        top: `${props.y || 0}px`,
    } as React.CSSProperties;

    const { orderList, sumPrice } = useOrder();
    const isInteractive = !!props.interactive;

    return (
        <div>
            <div className="mixer-container" style={style}>
                <div className="mixer-cylinder">
                    <motion.div
                        className="mixer-stand__interactivePanel"
                        initial={false}
                        animate={{
                            opacity: isInteractive ? 1 : 0,
                            y: isInteractive ? 0 : 12,
                        }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                    >
                        <div className="mixer-cylinder__contents mixer-cylinder__contents--interactive">
                            {orderList.map((item) => (
                                <MixerIngredientItem
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    price={item.price}
                                    color={item.color}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="mixer-stand">
                    <motion.div
                        className="mixer-stand__interactivePanel"
                        initial={false}
                        animate={{
                            opacity: isInteractive ? 1 : 0,
                            y: isInteractive ? 0 : 12,
                        }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                    >
                        <div className="mixer-totalBadge">合計 {sumPrice}円</div>
                        <button className="mixer-confirmButton" type="button">
                            決定
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};