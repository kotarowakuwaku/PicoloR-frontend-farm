import React from 'react';
import { Button as AntButton, ConfigProvider } from 'antd';
import { CSSProperties } from 'react';
import { ButtonMode } from "../types/ButtonMode";

type ButtonProps = {
    text: string;
    type: ButtonMode;
    onClick?: () => void;
};

const Button = ({ text, type, onClick }: ButtonProps) => {
    const greenStyle: CSSProperties = {
        width: '100%',
        height: '100%',
        fontSize: '1.5rem',
        textAlign: 'center',
        backgroundColor: '#0AC74F',
        color: 'white',
        padding: '17px 0',
        border: '2px solid black',
        borderRadius: '24px',
    };

    const dashedStyle: CSSProperties = {
        width: '100%',
        height: '100%',
        fontSize: '1.5rem',
        textAlign: 'center',
        padding: '17px 0',
        borderStyle: 'dashed solid',
        borderRadius: '24px',   
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorText: 'black',
                    borderRadius: 4,
                },
                components: {
                    Button: {
                        colorPrimaryHover: 'black', // Hover時の色
                        colorPrimaryBorderHover: '#007A30',
                    },
                },
            }}
        >
            <AntButton style={type === ButtonMode.GREEN ? greenStyle : dashedStyle} onClick={onClick}>
                {text}
            </AntButton>
        </ConfigProvider>
    );
};

export default Button;
