import { memo } from 'react';
import cls from './ArtistsLinks.module.css';
import { Artist } from '../../models/artist/artistSchema.ts';
import { classNames } from '../../utils/classNames.ts';
import { AppLink, AppLinkMode } from '../../ui/AppLink/AppLink.tsx';
import { AppRoutes } from '../../routeConfig.tsx';

interface ArtistsLinksProps {
    className?: string
    artists?: Artist[]
}

export const ArtistsLinks = memo(({ className, artists }: ArtistsLinksProps) => {
    return (
        <div className={classNames(cls.ArtistsLinks, {}, [className])}>
            {artists && artists.map((artist, i) => (
                <AppLink
                    key={artist.id}
                    className={cls.link}
                    mode={AppLinkMode.LINK}
                    to={`${AppRoutes.ARTISTS}/${artist.id}`}
                >
                    {artist.name}
                    {i === artists.length - 1 ? '' : ', '}
                </AppLink>
            ))}
        </div>
    );
});
