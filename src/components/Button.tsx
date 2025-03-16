import React from 'react';
import { Button as AntButton, ConfigProvider } from 'antd';
import { CSSProperties } from 'react';

type ButtonProps = {
    text: string;
    type: 'green' | 'white';
};

const Button = ({ text, type }: ButtonProps) => {
    const greenStyle: CSSProperties = {
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#0AC74F',
        color: 'white',
        padding: '17px 0',
        border: '2px solid black',
    };

    const whiteStyle: CSSProperties = {
        width: '100%',
        textAlign: 'center',
        padding: '17px 0',
        borderStyle: 'dashed solid',
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
            <AntButton style={type === 'green' ? greenStyle : whiteStyle}>
                {text}
            </AntButton>
        </ConfigProvider>
    );
};

export default Button;
