import React from "react";
import "./MixerIngredientItem.css";

export type MixerIngredientItemProps = {
    id: string;
    name: string;
    price: number;
    color: string;
    onRemove?: (id: string) => void;
};

export const MixerIngredientItem: React.FC<MixerIngredientItemProps> = ({
    id,
    name,
    price,
    color,
    onRemove,
}) => {
    return (
        <div className="mixerIngredientItem" style={{ backgroundColor: color }}>
            <div className="mixerIngredientItem__name">{name}</div>

            <div className="mixerIngredientItem__price">
                {price.toLocaleString()}円
            </div>

            <button
                type="button"
                className="mixerIngredientItem__remove"
                onClick={() => onRemove?.(id)}
                aria-label={`${name} を削除`}
                disabled={!onRemove}
            >
                ×
            </button>
        </div>
    );
};

export default MixerIngredientItem;