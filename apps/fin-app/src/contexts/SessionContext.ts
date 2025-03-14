import {Session} from '@toolpad/core';

export type UserType = {
  id: string
  name: string;
  email: string;
  image?: string;
}

interface CognitoUser {
  sub ?: string;
  name ?: string;
  email ?: string;
  picture ?: string;
}

export const cognitoToUserType = (user : CognitoUser) : UserType => ({
  id: user.sub || '',
  name: user.name || '',
  email: user.email || '',
  image: user.picture,
})

export interface UserSession extends Session {
  user ?: UserType;
}
