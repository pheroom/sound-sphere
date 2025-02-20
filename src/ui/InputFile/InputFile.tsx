import { ChangeEvent, InputHTMLAttributes, memo } from 'react';
import cls from './InputFile.module.css';
import { classNames, Mods } from '../../utils/classNames.ts';

export enum InputFileSizeY{
    REGULAR = 'regular',
    COMPACT = 'compact',
}

export interface InputFileProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>{
    className?: string
    value?: string
    onChange?: (value: FileList) => void
    fullWidth?: boolean
    text?: string
    sizeY?: InputFileSizeY
    showName?: boolean
    fileName?: string
    defaultFileName?: string
}

export const InputFile = memo(({
    className, value, onChange, text = 'Select file', sizeY = InputFileSizeY.REGULAR,
    showName, defaultFileName, fileName, ...args
}: InputFileProps) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) onChange?.(e.target.files);
    };

    return (
        <div className={classNames(cls.Box, {}, [className, cls[sizeY]])}>
            <div className={cls.inputBox}>
                <i>{text}</i>
                <input
                    className={cls.InputFile}
                    onChange={onChangeHandler}
                    value={value}
                    type="file"
                    {...args}
                />
            </div>
            {showName && <i className={cls.fileName}>{fileName || defaultFileName || 'File not selected'}</i>}
        </div>
    );
});
