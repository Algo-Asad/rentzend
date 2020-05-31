import * as Yup from "yup";
import {phoneRegExp} from "../../utils/regex";

export enum SignUpFormKeys {
    Name = 'NAME',
    Email = 'EMAIL',
    Phone = 'PHONE',
    Address = 'ADDRESS',
    Zip = 'ZIP',
    Files = 'PHOTO',
}

export const SignUpInitialValues = {
    [SignUpFormKeys.Name]: '',
    [SignUpFormKeys.Email]: '',
    [SignUpFormKeys.Phone]: '',
    [SignUpFormKeys.Address]: '',
    [SignUpFormKeys.Zip]: '',
    [SignUpFormKeys.Files]: [],
}

export const SignUpSchema = Yup.object().shape({
    [SignUpFormKeys.Name]: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Full Name Required'),
    [SignUpFormKeys.Email]: Yup.string()
        .email('Invalid Email')
        .required('Email Required'),
    [SignUpFormKeys.Phone]: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('Phone Number Required'),
    [SignUpFormKeys.Address]: Yup.string()
        .required('Address Required'),
    [SignUpFormKeys.Zip]: Yup.string()
        .test('len', 'Must be exactly 5 characters', val => val.length === 5)
        .required('Zip Code Required'),
    [SignUpFormKeys.Files]: Yup.array()
        .min(2, 'You must upload 2 photos')
        .max(2, 'You must upload 2 photos'),
});
