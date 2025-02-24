import { memo, ReactNode } from 'react';
import cls from './ListTemplate.module.css';
import { Text, TextMode } from '../../ui/Text/Text.tsx';
import { AppLink, AppLinkMode } from '../../ui/AppLink/AppLink.tsx';
import { classNames } from '../../utils/classNames.ts';

interface ListTemplateProps {
    className?: string
    title: string
    linkText?: string
    linkPath?: string
    error?: string
    children?: ReactNode
}

export const ListTemplate = memo(({ className, title, linkPath, linkText, error, children }: ListTemplateProps) => {
    return (
        <div className={classNames(cls.ListTemplate, {}, [className])}>
            <div className={cls.header}>
                <Text mode={TextMode.TITLE}>{title}</Text>
                {linkPath && (
                    <AppLink
                        to={linkPath}
                        mode={AppLinkMode.LINK}
                    >
                        {linkText || 'Show more'}
                    </AppLink>
                )}
            </div>
            <Text mode={TextMode.ERROR}>{error}</Text>
            {children}
        </div>
    );
});
