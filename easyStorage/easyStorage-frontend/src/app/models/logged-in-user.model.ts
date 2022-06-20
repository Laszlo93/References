import { UserDataModel } from "./user-data.model";

export interface LoggedInUserModel {
  accessToken: string,
  refreshToken: string,
  userData: UserDataModel
}
