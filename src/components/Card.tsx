import React, { useEffect, useState } from "react";
import "./Card.css";
import { useOrder } from "../contexts/OrderContext";

export type CardProps = {
  id?: string;
  image: string;
  name: string;
  price: number | string;
  quantity?: number;
  color?: string;
  x?: number;
  y?: number;
  className?: string;
};

export const Card: React.FC<CardProps> = ({
  id,
  image,
  name,
  price,
  color = "#E6E0C9",
  x = 50,
  y = 50,
  className = ""
}) => {
  const numericPrice = typeof price === "string" ? Number(price) : price;

  
  const { addIngredient, deleteIngredient, getQuantity } = useOrder();
  const count = getQuantity(name);
  return (
    <div className={`card ${className}`.trim()}>
      <div className="card__imageArea">
        <img
          className="card__image"
          src={image}
          alt={name}
          style={{ objectPosition: `${x}% ${y}%` }}
        />
        <div className="card__overlay">
          <span className="card__name">{name}</span>
        </div>
      </div>

      <div className="card__bottom" style={{ backgroundColor: color }}>
        <div className="card__meta">
          <span className="card__nameInline">1本</span>
          <span className="card__price">{price}円</span>
        </div>

        <div className="card__stepper">
          <button
            type="button"
            className="card__btn"
            onClick={() => {
              console.log('Push!');
              deleteIngredient(name);
            }}
            aria-label="個数を減らす"
          >
            -
          </button>
          <span className="card__count">{count}</span>
          <button
            type="button"
            className="card__btn"
            onClick={() => {
              if (id) {
                addIngredient({
                  name,
                  price: numericPrice,
                  image,
                  color: color,
                });
              }
            }}
            aria-label="個数を増やす"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;