import React from 'react'

import { TextButtonProps } from './TextButtonProps';

import './styles.css';

const TextButton: React.FC<TextButtonProps> = ({
    text,
    onClick = () => { },
    buttonColor = "#008CFF",
    fontSize,
    customClass
}) => {
    return (
        <button className={`textBtn ${customClass || ''}`} style={{ fontSize, color: buttonColor }} onClick={onClick}>{text}</button>
    )
}

export default TextButton;