import { memo, useEffect, useState } from 'react';
import cls from './EditArtistProfilePage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { EditArtistProfileForm } from '../../components/EditArtistProfileForm/EditArtistProfileForm.tsx';

export const EditArtistProfilePage = memo(() => {
    return (
        <div className={classNames(cls.EditArtistProfilePage, {}, [])}>
            <EditArtistProfileForm />
        </div>
    );
});
