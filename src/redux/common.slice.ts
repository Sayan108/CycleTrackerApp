import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PeriodEntry {
  startDate: string; // ISO String
  endDate?: string; // ISO String
}

export enum AppMode {
  CYCLE = 'cycle',
  PREGNANCY = 'pregnancy',
}

export type ReproductiveGoal = 'avoid' | 'conceive';

interface ReproductiveState {
  // Mode & Launch
  mode: AppMode;
  isFirstLaunch: boolean;

  // Core Data
  lastPeriodDate: string;
  lmpDate: string;
  history: PeriodEntry[];

  // User Parameters (Stored as numbers, but handled as strings in UI)
  averageCycleLength: number;
  periodLength: number;

  // New Tracking Preferences
  goal: ReproductiveGoal;
  regularCycle: boolean;
}

const initialState: ReproductiveState = {
  mode: AppMode.CYCLE,
  isFirstLaunch: true,
  lastPeriodDate: new Date().toISOString(),
  lmpDate: new Date().toISOString(),
  history: [],
  averageCycleLength: 28,
  periodLength: 5,
  goal: 'avoid',
  regularCycle: true,
};

export const reproductiveSlice = createSlice({
  name: 'reproductive',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<AppMode>) => {
      state.mode = action.payload;
    },
    // Generic updater for settings (Supports goal, cycleLength, etc.)
    updateSettings: (
      state,
      action: PayloadAction<Partial<ReproductiveState>>,
    ) => {
      return { ...state, ...action.payload };
    },
    addPeriodEntry: (state, action: PayloadAction<PeriodEntry>) => {
      state.history.push(action.payload);
      state.lastPeriodDate = action.payload.startDate;
    },
    setGoal: (state, action: PayloadAction<ReproductiveGoal>) => {
      state.goal = action.payload;
    },
    setRegularity: (state, action: PayloadAction<boolean>) => {
      state.regularCycle = action.payload;
    },
    completeOnboarding: state => {
      state.isFirstLaunch = false;
    },
    resetData: () => initialState,
  },
});

export const {
  setMode,
  updateSettings,
  addPeriodEntry,
  setGoal,
  setRegularity,
  completeOnboarding,
  resetData,
} = reproductiveSlice.actions;

export default reproductiveSlice.reducer;
