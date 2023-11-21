import { actionCreatorFactory } from 'typescript-fsa';
const actionCreator = actionCreatorFactory('LOGIN');

export interface RegisterSubmitEvent {
    name: string;
    email: string;
    role: string;
    code?: string;
    company_name?: string;
    password: string;
    password2: string;
}
export interface LoginSubmitEvent {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface InputChangeEvent {
    field: string;
    value: string;
}

export interface ForgotPasswordSubmitEvent {
    email: string;
}

export interface ResetPasswordSubmitEvent {
    email: string;
    otp: string;
    password: string;
}

export const registerSubmit = actionCreator<RegisterSubmitEvent>('REGISTER_SUBMIT');
export const loginSubmit = actionCreator<LoginSubmitEvent>('LOGIN_SUBMIT');
export const forgotPasswordSubmit = actionCreator<ForgotPasswordSubmitEvent>('FORGOT_PASSWORD_SUBMIT');
export const resetPasswordSubmit = actionCreator<ResetPasswordSubmitEvent>('RESET_PASSWORD_SUBMIT');
export const loginSubmitAsync = actionCreator.async<LoginSubmitEvent, any, any>('LOGIN_SUBMIT_ASYNC');

export const inputChange = actionCreator<InputChangeEvent>('INPUT_CHANGE');
