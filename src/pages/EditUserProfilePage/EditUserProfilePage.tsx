import { memo, useEffect, useState } from 'react';
import cls from './EditUserProfilePage.module.css';
import { classNames } from '../../utils/classNames.ts';
import { EditUserProfileForm } from '../../components/EditUserProfileForm/EditUserProfileForm.tsx';

export const EditUserProfilePage = memo(() => {
    return (
        <div className={classNames(cls.EditProfilePage, {}, [])}>
            <EditUserProfileForm />
        </div>
    );
});
