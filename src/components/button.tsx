import React from "react";
import "./button.css";

type ButtonProps = {
    text: string;
    x?: number;
    y?: number;
    opacity?: number;
    backgroundColor?: string;
    iconSrc?: string;
    onClick?: () => void;
};

export default function Button({
    text,
    x = 0,
    y = 0,
    opacity = 1,
    backgroundColor = "#d9d9d9",
    iconSrc,
    onClick,
}: ButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="self-order-button"
            style={
                {
                    "--button-left": `${x}px`,
                    "--button-top": `${y}px`,
                    "--button-opacity": opacity,
                    "--button-bg": backgroundColor,
                } as React.CSSProperties
            }
        >
            <span className="self-order-button__icon">
                {iconSrc ? (
                    <img
                        src={iconSrc}
                        alt=""
                        className="self-order-button__img"
                    />
                ) : null}
            </span>

            <span className="self-order-button__label">{text}</span>
        </button>
    );
}