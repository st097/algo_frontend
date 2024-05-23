interface ILoginRequest{
    name:string;
    phone: number|null;
    email: string;
    password: string;
}

export type {ILoginRequest};