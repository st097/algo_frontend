interface IRegisterRequest{
    name: string;
    phone: number | null;
    email: string;
    password: string;
    dateOfBirth: string;
    isHuman: boolean;
}

export type {IRegisterRequest};