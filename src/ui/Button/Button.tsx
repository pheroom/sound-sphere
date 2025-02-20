import { ButtonHTMLAttributes, memo } from 'react';
import cls from './Button.module.css';
import { classNames, Mods } from '../../utils/classNames.ts';

export enum ButtonMode{
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    OUTLINE = 'outline',
    TERTIARY = 'tertiary',
    LINK = 'link',
    // ICON = 'icon',
}

export enum ButtonTheme{
    ACCENT = 'accent',
    POSITIVE = 'positive',
    NEGATIVE = 'negative',
}

export enum ButtonSize{
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    theme?: ButtonTheme
    size?: ButtonSize
    mode?: ButtonMode
    isIcon?: boolean
}

export const Button = memo((
    { className, children, size = ButtonSize.M, mode = ButtonMode.PRIMARY,
        theme = ButtonTheme.ACCENT, disabled, isIcon, ...args }: ButtonProps,
) => {
    const mods: Mods = {
        [cls.disabled]: disabled,
        [cls.icon]: isIcon,
    };

    return (
        <button
            className={classNames(cls.Button, mods, [className, cls[mode], cls[theme], cls[size]])}
            disabled={disabled}
            {...args}
        >
            <span>
                {children}
            </span>
        </button>
    );
});
