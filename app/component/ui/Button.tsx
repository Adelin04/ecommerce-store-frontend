import React from "react";

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, React.AriaAttributes { }

 const Button: React.FC<ButtonProps> = props => {
    const { children, ...attributes } = props;

    return (
        <button {...attributes} disabled={attributes.disabled}>{children}</button>
    )
}

export default Button