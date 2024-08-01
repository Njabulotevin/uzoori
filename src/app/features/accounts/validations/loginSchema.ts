import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Please Enter a valid email address").required(),
  password: yup.string().required(),
});

export const RegisterSchema = yup.object().shape({
  email: yup.string().email("Please Enter a valid email address").required(),
  username: yup
    .string()
    .matches(/^\S*$/, "username may not contain spaces")
    .required(),
  password: yup.string().required(),
  name: yup.string().required(),
  accountType: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords must match"),
  description: yup.string(),
});

export const createMerchantSchema = yup.object().shape({
  name: yup.string().required(),
  username: yup
    .string()
    .matches(/^\S*$/, "username may not contain spaces")
    .required(),
  category: yup.string(),
  description: yup.string().required(),
  accountType: yup.string(),
  addressLine1: yup.string().required(),
  addressLine2: yup.string(),
  city: yup.string().required(),
  postalCode: yup.number().required(),
  province: yup.string().required(),
  country: yup.string().required(),
  firstContactNumber: yup.string().required(),
  secondContactNumber: yup.string(),
  weekdayStart: yup.string().required(),
  weekdayEnd: yup.string().required(),
  saturdayStart: yup.string().required(),
  saturdayEnd: yup.string().required(),
  sundayStart: yup.string().required(),
  sundayEnd: yup.string().required(),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords must match"),
});
