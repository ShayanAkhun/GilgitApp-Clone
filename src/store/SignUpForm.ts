import create from "zustand";
import { SignUpForm } from "../Types";



export const defaultSignUpForm: SignUpForm[] = [
]

interface SignUpFormStore {
    signUp: SignUpForm[];
    setSignUp: (filters: SignUpForm[]) => void;
    signUpEditing: boolean;
    selectedsignUpForm: SignUpForm | null;
    setSelectedsignUp: (signUp: SignUpForm) => void;
    discardsignUp: () => void;
}

export const signUpFormStore = create<SignUpFormStore>(set => ({
    signUp: defaultSignUpForm,
    signUpEditing: false,
    selectedsignUpForm: null,
    setSignUp(signUp: SignUpForm[]) {
        set(() => ({ signUp }));
    },
    setSelectedsignUp(signUp: SignUpForm) {
        set(() => ({ selectedsignUpForm: signUp, signUpEditing: true }));
    },
    discardsignUp() {
        set(() => ({ selectedsignUpForm: null, signUpEditing: false }))
    },
}));
