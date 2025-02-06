import React, { memo, TextareaHTMLAttributes } from 'react';
import cls from './Textarea.module.css';
import { classNames, Mods } from '../../utils/classNames.ts';

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'>{
    className?: string
    value?: string
    onChange?: (value: string) => void
    classNameBox?: string
}

export const Textarea = memo(({
    className, value, onChange, classNameBox, ...args
}: TextareaProps) => {
    const mods: Mods = { };

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div className={classNames(cls.Box, {}, [classNameBox])}>
            <textarea
                onChange={onChangeHandler}
                value={value}
                className={classNames(cls.Textarea, mods, [className])}
                {...args}
            />
        </div>
    );
});
