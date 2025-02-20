import { AllHTMLAttributes, memo, ReactNode } from 'react';
import cls from './Form.module.css';
import { classNames } from '../../utils/classNames.ts';
import { Button, ButtonProps, ButtonSize, ButtonTheme } from '../Button/Button.tsx';
import { Input, InputProps } from '../Input/Input.tsx';
import { InputFile, InputFileProps } from '../InputFile/InputFile.tsx';
import { AppLink, AppLinkMode, AppLinkProps, AppLinkSize } from '../AppLink/AppLink.tsx';
import { Textarea, TextareaProps } from '../Textarea/Textarea.tsx';
import { Picture, PictureProps, PictureSize } from '../Picture/Picture.tsx';
import { Text, TextMode } from '../Text/Text.tsx';

interface FormProps extends AllHTMLAttributes<HTMLDivElement> {
    className?: string
    title?: string
}

export const Form = memo(({ className, title, children, ...args }: FormProps) => {
    return (
        <div className={classNames(cls.Form, {}, [className])} {...args}>
            <Text className={cls.title} mode={TextMode.TITLE}>{title}</Text>
            {children}
        </div>
    );
});

export const FormButton = memo(({ className, children, ...args }: ButtonProps) => {
    return (
        <Button
            size={ButtonSize.L}
            theme={ButtonTheme.POSITIVE}
            className={classNames(cls.button, {}, [className])}
            {...args}
        >
            {children}
        </Button>
    );
});

interface FormInputProps extends InputProps {
    setData: React.Dispatch<React.SetStateAction<Object>>
    dataName: string
}

export const FormInput = memo(({ classNameBox, placeholder, dataName, setData, ...args }: FormInputProps) => {
    const onChangeHandler = (value: string) => {
        setData((prev) => ({ ...prev, [dataName]: value }));
    };

    return (
        <Input
            placeholder={placeholder}
            onChange={onChangeHandler}
            type="text"
            classNameBox={classNames(cls.input, {}, [classNameBox])}
            {...args}
        />
    );
});

interface FormTextareaProps extends TextareaProps {
    setData: React.Dispatch<React.SetStateAction<Object>>
    dataName: string
}

export const FormTextarea = memo(({ classNameBox, placeholder, dataName, setData, ...args }: FormTextareaProps) => {
    const onChangeHandler = (value: string) => {
        setData((prev) => ({ ...prev, [dataName]: value }));
    };

    return (
        <Textarea
            placeholder={placeholder}
            onChange={onChangeHandler}
            classNameBox={classNames(cls.input, {}, [classNameBox])}
            {...args}
        />
    );
});

export const FormInputFile = memo(({ className, ...args }: InputFileProps) => {
    return (
        <InputFile
            className={classNames(cls.input, {}, [className])}
            {...args}
        />
    );
});

export const FormLink = memo(({ className, children, ...args }: AppLinkProps) => {
    return (
        <AppLink
            className={classNames(cls.link, {}, [className])}
            size={AppLinkSize.L}
            mode={AppLinkMode.BUTTON}
            {...args}
        >
            {children}
        </AppLink>
    );
});

export const FormSep = () => {
    return (
        <div className={cls.sep} />
    );
};

export const FormError = ({ children }: {children: ReactNode}) => {
    return (
        <div className={cls.error}>{children}</div>
    );
};

interface FormImageBoxProps extends PictureProps {
    text?: string
}

export const FormPictureBox = ({
    text = 'Selected new image:', ...args
}: FormImageBoxProps) => {
    return (
        <div className={cls.pictureBox}>
            <p>{text}</p>
            <Picture
                size={PictureSize.L}
                {...args}
            />
        </div>
    );
};
