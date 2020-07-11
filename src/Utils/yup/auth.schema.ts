import { string, object, number } from "yup";
import {
  emailNotLongEnough,
  invalidEmail,
  passwordNotLongEnough,
  invalidUserRole,
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
  role: number().min(1, invalidUserRole).max(2, invalidUserRole).required(),
  user_name: string(),
  password: pv,
  photo: string(),
});

export const passwordChange_schema = object().shape({
  newPassword: pv,
});
