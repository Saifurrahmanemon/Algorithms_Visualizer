import create from "zustand";

export const useTime = create((set) => ({
    time: 0,
    setTime: () => set((state) => ({ time: state.time + 10 })),
    resetTime: () => set({ time: 0 }),
}));
