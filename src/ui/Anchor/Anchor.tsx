import { ForwardedRef, forwardRef, memo } from 'react';
import cls from './Anchor.module.css';
import { classNames } from '../../utils/classNames.ts';

interface AnchorProps {
    className?: string
}

export const Anchor = forwardRef(({ className }: AnchorProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <div
            className={classNames(cls.Anchor, {}, [className])}
            ref={ref}
        />
    );
});
