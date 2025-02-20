import { HTMLAttributes, memo } from 'react';
import cls from './Text.module.css';
import { classNames } from '../../utils/classNames.ts';

export enum TextMode{
    ERROR = 'error',
    TEXT = 'text',
    TITLE = 'title',
}

interface TextProps extends HTMLAttributes<HTMLDivElement>{
    className?: string
    mode?: TextMode
}

export const Text = memo(({ className, mode = TextMode.TEXT, children, ...args }: TextProps) => {
    return (
        <div className={classNames(cls.Text, {}, [className, cls[mode]])} {...args}>
            {children}
        </div>
    );
});
