import { create } from 'zustand';

type ProgressState = {
  xp: number;
  unlockedLevel: number;
  completed: Record<number, boolean>;
  completeLevel: (id: number, gainedXp: number) => void;
};

export const useProgressStore = create<ProgressState>((set) => ({
  xp: 0,
  unlockedLevel: 1,
  completed: {},
  completeLevel: (id, gainedXp) =>
    set((s) => ({
      xp: s.xp + gainedXp,
      completed: { ...s.completed, [id]: true },
      unlockedLevel: Math.max(s.unlockedLevel, id + 1)
    }))
}));
