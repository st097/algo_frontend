import { create } from 'zustand'

interface ILoginStore {
    userFullName: string;
    userEmail: string;
    token: string;
    roles: string[];
    addRole: (role: string) => void;
}

const useLoginStore = create<ILoginStore>((set) => ({
    userFullName: "",
    userEmail: "",
    token: "",
    roles: [],
    addRole: (role: string) => set((state) => ({ roles: [...state.roles, role] })),
}))

export default useLoginStore