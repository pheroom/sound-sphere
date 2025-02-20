import React, { memo, ReactNode } from 'react';
import { Link, LinkProps, NavLink } from 'react-router';
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

export interface AppLinkProps extends LinkProps {
    className?: string
    theme?: AppLinkTheme
    mode?: AppLinkMode
    size?: AppLinkSize
    navLink?: boolean
    children?: ReactNode
    activeClassName?: string
}

export const AppLink = memo(({
    className, children, to, mode = AppLinkMode.PRIMARY, theme = AppLinkTheme.ACCENT,
    size = AppLinkSize.M, navLink = false, activeClassName = '', ...args
}: AppLinkProps) => {
    if (navLink) {
        return (
            <NavLink
                className={({ isActive }) => classNames(
                    cls.AppLink,
                    { [activeClassName]: isActive },
                    [className, cls[mode], cls[theme], cls[size]],
                )}
                to={to}
                {...args}
            >
                <span>{children}</span>
            </NavLink>
        );
    }
    return (
        <Link
            className={classNames(cls.AppLink, {}, [className, cls[mode], cls[theme], cls[size]])}
            to={to}
            {...args}
        >
            <span>{children}</span>
        </Link>
    );
});
