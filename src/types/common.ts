import { USER_ROLE } from "@/constants/roles";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type TMeta = {
  page: number;
  limit: number;
  count: number;
};

export type TResponseSuccess = {
  data: any;
  meta?: TMeta;
};

export type TResponseError = {
  statusCode: number;
  message: string;
  errorMessages: TGenericErrorMessage[];
};

export type TGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type TUserRole = keyof typeof USER_ROLE;

export type TDrawerItems = {
  title: string;
  path: string;
  parentPath?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  child?: TDrawerItems[];
};

export type TMeta = {
  page: number;
  limit: number;
  total: number;
};

export const Gender = ["MALE", "FEMALE"];
