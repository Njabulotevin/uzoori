import * as yup from "yup"


export const loginSchema = yup.object().shape({
    email: yup.string().email("Please Enter a valid email address").required(),
    password: yup.string().required()
})