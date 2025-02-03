import React, { memo, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router';
import cls from './AppLink.module.css';
import { classNames } from '../../utils/classNames.ts';
import { ButtonMode, ButtonSize } from '../Button/Button.tsx';

export enum AppLinkMode{
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    LINK = 'link',
    BUTTON = 'button',
}

export enum AppLinkTheme {
    ACCENT = 'accent',
    POSITIVE = 'positive',
    NEGATIVE = 'negative',
}

export enum AppLinkSize{
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
}

interface AppLinkProps extends LinkProps {
    className?: string
    theme?: AppLinkTheme
    mode?: AppLinkMode
    size?: AppLinkSize
    children?: ReactNode
}

export const AppLink = memo(({
    className, children, to, mode = AppLinkMode.PRIMARY, theme = AppLinkTheme.ACCENT,
    size = AppLinkSize.M, ...args
}: AppLinkProps) => (
    <Link
        to={to}
        className={classNames(cls.AppLink, {}, [className, cls[mode], cls[theme], cls[size]])}
        {...args}
    >
        <span>{children}</span>
    </Link>
));
