import {Session} from '@toolpad/core';

export type UserType = {
  id: string
  name: string;
  email: string;
  image?: string;
}

export interface UserSession extends Session {
  user ?: UserType;
}
