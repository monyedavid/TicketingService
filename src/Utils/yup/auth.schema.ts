import { string, object, number, ref } from "yup";
import {
  emailNotLongEnough,
  invalidEmail,
  passwordNotLongEnough,
  invalidUserRole,
  region_ghana,
  region_liberia,
  region_nigeria,
  region_senegal,
} from "../constants";

export const pv = string().min(7, passwordNotLongEnough).max(255).required();

export const reg_schema = object().shape({
  first_name: string().required(),
  last_name: string().required(),
  email: string()
    .min(6, emailNotLongEnough)
    .max(255)
    .email(invalidEmail)
    .required(),
  role: number().min(2, invalidUserRole).max(5, invalidUserRole).required(),
  user_name: string(),
  password: pv,
  photo: string(),
});

export const passwordChange_schema = object().shape({
  newPassword: pv,
});
