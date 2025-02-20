import { ChangeEvent, InputHTMLAttributes, memo } from 'react';
import cls from './Input.module.css';
import { classNames, Mods } from '../../utils/classNames.ts';

export enum InputSizeY{
    REGULAR = 'regular',
    COMPACT = 'compact',
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>{
    className?: string
    value?: string
    onChange?: (value: string) => void
    classNameBox?: string
    sizeY?: InputSizeY
    fullWidth?: boolean
}

export const Input = memo(({
    className, value, onChange, classNameBox, type = 'text', sizeY = InputSizeY.REGULAR, ...args
}: InputProps) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div className={classNames(cls.Box, {}, [classNameBox])}>
            <input
                onChange={onChangeHandler}
                value={value}
                type={type}
                className={classNames(cls.Input, {}, [className, cls[sizeY]])}
                {...args}
            />
        </div>
    );
});
