import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Reducer } from 'redux';
import {
    loginSubmit,
    LoginSubmitEvent,
    inputChange,
    InputChangeEvent,
    forgotPasswordSubmit,
    ForgotPasswordSubmitEvent,
    resetPasswordSubmit,
    ResetPasswordSubmitEvent,
    registerSubmit
} from '../actions/login';

import { loginSubmitAsync } from '../actions/login';

import { isType } from 'typescript-fsa';
import { Action } from 'redux';

export interface LibraryItem {
    name: string;
    children: LibraryItem[];
}
export interface LoginState {
    name: string;
    email: string;
    role: string;
    code?: string;
    company_name?: string;
    password: string;
    otp: string;
    password2: string;
    rememberMe: boolean;
    completed: boolean;
    reset_completed: boolean;
    error: string;
    library?: LibraryItem[];
}

const loginSubmitHandler = (state: LoginState, payload: LoginSubmitEvent): LoginState => {
    // AuthService.login(payload.email, payload.password).then(data => {
    //     console.log(data);
    //     debugger;
    //     return {
    //         ...state,
    //         completed: true
    //     };
    // });
    return {
        ...state,
        completed: true
    };
};

// const loginSubmitAsyncHandler = async (state: LoginState, payload: LoginSubmitEvent): Promise<LoginState> => {
//   await AuthService.login(payload.email, payload.password);
//   return {
//     ...state,
//     completed: true,
//   };

// };

const loginChangeHandler = (state: LoginState, payload: InputChangeEvent): LoginState => {
    return {
        ...state,
        name: payload.field === 'name' ? payload.value : state.name,
        email: payload.field === 'email' ? payload.value : state.email,
        role: payload.field === 'role' ? payload.value : state.role,
        company_name: payload.field === 'company_name' ? payload.value : state.company_name,
        code: payload.field === 'code' ? payload.value : state.code,
        password: payload.field === 'password' ? payload.value : state.password,
        otp: payload.field === 'otp' ? payload.value : state.otp,
        password2: payload.field === 'password2' ? payload.value : state.password2,
        rememberMe: payload.field === 'rememberMe' ? payload.value === '1' : state.rememberMe
    };
};

const forgotPasswordSubmitHandler = (state: LoginState, payload: ForgotPasswordSubmitEvent): LoginState => {
    // AuthService.forgotPassword(payload.email).then(data => {
    //     console.log(data);
    //     debugger;
    // });

    return {
        ...state,
        completed: true
    };
};

const resetPasswordSubmitHandler = (state: LoginState, payload: ResetPasswordSubmitEvent): LoginState => {
    // AuthService.resetPassword(payload.email, "otp", payload.password).then(data => {
    //     console.log(data);
    //     debugger;
    // });
    return {
        ...state,
        reset_completed: true,
        completed: true
    };
};

export const loginReducer: Reducer<LoginState> = reducerWithInitialState<LoginState>({
    name: '',
    email: '',
    role: '',
    company_name: '',
    code: '',
    password: '',
    otp: '',
    password2: '',
    rememberMe: false,
    error: '',
    completed: false,
    reset_completed: false,
    library: [
        {
            name: 'Motilal Nehru',
            children: [
                {
                    name: 'Jawaharlal Nehru',
                    children: [
                        {
                            name: 'Indira Gandhi',
                            children: [{ name: 'Rajeev Gandhi', children: [] }, { name: 'Sanjay Gandhi', children: [] }]
                        }
                    ]
                },
                { name: 'Vijaylaxmi Pandit', children: [] }
            ]
        }
    ]
})
    .case(loginSubmit, loginSubmitHandler)
    .case(inputChange, loginChangeHandler)
    .case(registerSubmit, (state: LoginState) => {
        return { ...state, completed: true };
    })
    .case(forgotPasswordSubmit, forgotPasswordSubmitHandler)
    .case(resetPasswordSubmit, resetPasswordSubmitHandler)
    .case(loginSubmitAsync.started, (state: LoginState) => {
        return { ...state, completed: false };
    })
    .case(loginSubmitAsync.done, (state: LoginState) => {
        return { ...state, completed: true };
    })
    .build();

export const nameSelector = (state: LoginState) => state.name;
export const emailSelector = (state: LoginState) => state.email;
export const roleSelector = (state: LoginState) => state.role;
export const companyNameSelector = (state: LoginState) => state.company_name;
export const codeSelector = (state: LoginState) => state.code;
export const passwordSelector = (state: LoginState) => state.password;
export const otpSelector = (state: LoginState) => state.otp;
export const password2Selector = (state: LoginState) => state.password2;
export const rememberMeSelector = (state: LoginState) => state.rememberMe;
export const completedSelector = (state: LoginState) => state.completed;
export const errorSelector = (state: LoginState) => state.error;

export const librarySelector = (state: LoginState) => state.library;

export const reducer = (state: LoginState, action: Action): LoginState => {
    if (isType(action, loginSubmitAsync.started)) {
        return { ...state, completed: false };
    }
    if (isType(action, loginSubmitAsync.done)) {
        return { ...state, completed: true };
    }
    return state;
};
