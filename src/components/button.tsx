import React from "react";
import "./button.css";

type ButtonProps = {
    text: string;
    width?: number;
    height?: number;
    opacity?: number;
    backgroundColor?: string;
    iconSrc?: string;
    iconSize?: number;
    onClick?: () => void;
};

export const Button = ({
    text,
    width = 200,
    height = 50,
    opacity = 1,
    backgroundColor = "#d9d9d9",
    iconSrc,
    iconSize = 70,
    onClick,
}: ButtonProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="self-order-button"
            style={
                {
                    "--button-width": `${width}px`,
                    "--button-height": `${height}px`,
                    "--button-opacity": opacity,
                    "--button-bg": backgroundColor,
                    "--button-icon-width": `${iconSize}%`,
                    "--button-icon-height": `${iconSize}%`,
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