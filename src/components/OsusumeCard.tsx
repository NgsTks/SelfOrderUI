import React from "react";
import "./OsusumeCard.css";
import { useOrder } from "../contexts/OrderContext";
import type { OsusumeIngredients } from "../types/product";

export type OsusumeCardProps = {
  image: string;
  name: string;
  price: number | string;
  bottomColor?: string;
  x?: number;
  y?: number;
  className?: string;
  ingredients?: OsusumeIngredients;
};

export const OsusumeCard: React.FC<OsusumeCardProps> = ({
  image,
  name,
  price,
  bottomColor = "#EDE8A5",
  x = 50,
  y = 50,
  className = "",
  ingredients,
}) => {
  const { resetIngredients, addOsusumeIngredients } = useOrder();
  return (
    <button className={`osusume-card ${className}`.trim()}
    onClick={() => {
      if (!ingredients) {
        console.error("ingredients is undefined");
        return;
      }
      resetIngredients();
      addOsusumeIngredients(ingredients);
      console.log('Push!');
    }}
    >
      <div className="osusume-card__imageArea">
        <img
          className="osusume-card__image"
          src={image}
          alt={name}
          style={{ objectPosition: `${x}% ${y}%` }}
        />

        <div className="osusume-card__overlay">
          <span className="osusume-card__name">{name}</span>
        </div>
      </div>

      <div className="osusume-card__priceArea" style={{ backgroundColor: bottomColor }}>
        <div className="osusume-card__price">
          <span className="osusume-card__priceLabel">計</span>
          <span className="osusume-card__priceValue">{price}</span>
          <span className="osusume-card__priceUnit">円</span>
        </div>
      </div>
    </button>
  );
};

export default OsusumeCard;