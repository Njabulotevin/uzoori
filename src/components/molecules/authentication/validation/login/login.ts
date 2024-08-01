import { IloginCredentials } from "@/pages/account/login";



export const validateLogin = (values : IloginCredentials) => {
    const errors: IloginCredentials = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    return errors;
}