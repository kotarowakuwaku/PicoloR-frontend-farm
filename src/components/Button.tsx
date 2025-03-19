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
        padding: '17px 0',
        borderRadius: '24px',
    };

    const grayStyle: CSSProperties = {
        width: '100%',
        height: '100%',
        fontSize: '1.5rem',
        textAlign: 'center',
        padding: '17px 0',
        borderRadius: '24px',
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorText: 'black',
                    borderRadius: 2,
                    colorBorder: 'black',
                },
                components: {
                    Button: {
                        lineWidth: 4,
                        defaultBg:  type === ButtonMode.GREEN  ? "#0AC74F" : "#DDDDDD",
                        defaultColor: type === ButtonMode.GREEN  ? "white" : undefined,
                        defaultHoverBg: type === ButtonMode.GREEN  ? "#0aa141" :"gray",
                        defaultHoverColor: type === ButtonMode.GREEN  ? "#2e2e2e" : "white",
                        defaultHoverBorderColor: type === ButtonMode.GREEN  ? "#2e2e2e" : "black",
                        defaultActiveColor: type === ButtonMode.GREEN  ? "#2e2e2e" : undefined,
                        defaultActiveBg: type === ButtonMode.GREEN  ? "#088033" : "#2E2E2E",
                        defaultActiveBorderColor: type === ButtonMode.GREEN  ? "#088033" : undefined,
                    },
                },
            }}
        >
            <AntButton style={type === ButtonMode.GREEN ? greenStyle : grayStyle} onClick={onClick}>
                {text}
            </AntButton>
        </ConfigProvider>
    );
};

export default Button;
