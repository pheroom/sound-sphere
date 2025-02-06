import { ChangeEvent, InputHTMLAttributes, memo } from 'react';
import cls from './InputFile.module.css';
import { classNames, Mods } from '../../utils/classNames.ts';

export enum InputFileSizeY{
    REGULAR = 'regular',
    COMPACT = 'compact',
}

interface InputFileProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>{
    className?: string
    value?: string
    onChange?: (value: FileList) => void
    fullWidth?: boolean
    text?: string
    sizeY?: InputFileSizeY
}

export const InputFile = memo(({
    className, value, onChange, text = 'Select file', fullWidth = false, sizeY = InputFileSizeY.REGULAR, ...args
}: InputFileProps) => {
    const mods: Mods = { [cls.fullWidth]: fullWidth };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) onChange?.(e.target.files);
    };

    return (
        <div className={classNames(cls.Box, mods, [className, cls[sizeY]])}>
            <i>{text}</i>
            <input
                className={cls.InputFile}
                onChange={onChangeHandler}
                value={value}
                type="file"
                {...args}
            />
        </div>
    );
});
