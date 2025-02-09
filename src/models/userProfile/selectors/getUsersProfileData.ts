import { StateSchema } from '../../../store/store.ts';

export const getUsersProfileData = (state: StateSchema) => state.usersProfile.profileData;
