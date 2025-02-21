import {Session} from "@toolpad/core";

export type UserType = {
  id: string
  name: string;
  email: string;
  image?: string;
}

export const cognitoToUserType = (user : any) => ({
  id: user.sub,
  name: user.name,
  email: user.email,
  image: user.picture,
})

export interface UserSession extends Session {
  user ?: UserType;
  loading : boolean;
  reloadSession: () => void
}
