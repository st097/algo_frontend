import { create } from 'zustand'

interface IStore {
  count: number;
  titleStore: string;
  increment: () => void;
  decrement: () => void;
  updateTitle: (newTitle: string) => void;
}

const useCountStore = create<IStore>((set) => ({
  count: 1,
  titleStore: "Default Title",
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  updateTitle: (newTitle: string) => set({ titleStore: newTitle }),
}))

export default useCountStore
