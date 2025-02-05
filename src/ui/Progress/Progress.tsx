import { ChangeEvent, memo, Children, useState } from 'react';
import { getTrackBackground, Range } from 'react-range';
import { IRenderTrackParams, ITrackProps } from 'react-range/lib/types';
import cls from './Progress.module.css';
import { classNames } from '../../utils/classNames.ts';

interface ProgressProps {
    className?: string
    haveThumb?: boolean
    value: number
    min: number
    max: number
    onChange: (e: any) => void
}

export const Progress = memo(({ className, haveThumb = false, value, onChange, min, max }: ProgressProps) => {
    const getCssVar = (varName: string) => getComputedStyle(document.documentElement, null).getPropertyValue(varName);

    return (
        <Range
            step={0.001}
            min={min}
            max={max}
            values={[value]}
            onChange={(values) => onChange(values[0])}
            renderTrack={({ props, children }: IRenderTrackParams) => (
                <div
                    className={classNames(cls.Progress, {}, [className])}
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                >
                    <div
                        ref={props.ref}
                        className={cls.activeBar}
                        style={{
                            background: getTrackBackground({
                                values: [value],
                                colors: [getCssVar('--blue-color'), getCssVar('--grey-color')],
                                min,
                                max,
                            }),
                        }}
                    >
                        {children}
                    </div>
                </div>
            )}
            renderThumb={({ props }) => (
                <div
                    {...props}
                    key={props.key}
                    className={classNames(cls.thumb, { [cls.invisible]: !haveThumb })}
                >
                    {/* <div onMouseDown={() => {}} className={classNames(cls.thumbInfo, { [cls.invisible]: !haveThumb })}>12%</div> */}
                </div>
            )}
        />
    );
});
