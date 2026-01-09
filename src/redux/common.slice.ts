import {createSlice, PayloadAction} from '@reduxjs/toolkit';

/* ---------- Types ---------- */

export interface PeriodEntry {
  startDate: string; // ISO
  endDate?: string; // ISO
}

export enum AppMode {
  CYCLE = 'cycle',
  PREGNANCY = 'pregnancy',
}

export enum ReproductiveGoal {
  AVOID = 'avoid',
  CONCEIVE = 'conceive',
  TRACK_ONLY = 'track-only',
}

export interface ReproductiveState {
  /* User */
  name: string;

  /* App */
  mode: AppMode;
  isFirstLaunch: boolean;
  syncEnabled: boolean;

  /* Cycle Data */
  lastPeriodDate?: string; // ISO
  history: PeriodEntry[];

  avgCycleLength: number;
  avgPeriodLength: number;
  regularCycle: boolean;
  goal: ReproductiveGoal;

  /* Pregnancy */
  pregnancyLMP?: string; // ISO
}

/* ---------- Initial State ---------- */

const initialState: ReproductiveState = {
  name: 'User',

  mode: AppMode.CYCLE,
  isFirstLaunch: true,
  syncEnabled: false,

  lastPeriodDate: undefined,
  history: [],

  avgCycleLength: 28,
  avgPeriodLength: 5,
  regularCycle: true,
  goal: ReproductiveGoal.AVOID,

  pregnancyLMP: undefined,
};

/* ---------- Slice ---------- */

export const reproductiveSlice = createSlice({
  name: 'reproductive',
  initialState,
  reducers: {
    /* ---------- App ---------- */

    setMode: (state, action: PayloadAction<AppMode>) => {
      state.mode = action.payload;
    },

    addLastPeriosdDate: (state, action: PayloadAction<string>) => {
      state.lastPeriodDate = action.payload;
    },

    completeOnboarding: state => {
      state.isFirstLaunch = false;
    },

    toggleSync: (state, action: PayloadAction<boolean>) => {
      state.syncEnabled = action.payload;
    },

    /* ---------- User ---------- */

    setUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },

    /* ---------- Cycle ---------- */

    addPeriodEntry: (state, action: PayloadAction<PeriodEntry>) => {
      state.history.push(action.payload);
      state.lastPeriodDate = action.payload.startDate;
    },

    setCycleSettings: (
      state,
      action: PayloadAction<{
        avgCycleLength?: number;
        avgPeriodLength?: number;
        regularCycle?: boolean;
      }>,
    ) => {
      Object.assign(state, action.payload);
    },

    setGoal: (state, action: PayloadAction<ReproductiveGoal>) => {
      state.goal = action.payload;
    },

    /* ---------- Pregnancy ---------- */

    setPregnancyLMP: (state, action: PayloadAction<string | undefined>) => {
      state.pregnancyLMP = action.payload;
    },

    /* ---------- Utility ---------- */

    updateSettings: (
      state,
      action: PayloadAction<Partial<ReproductiveState>>,
    ) => {
      return {...state, ...action.payload};
    },

    resetData: () => initialState,
  },
});

/* ---------- Exports ---------- */

export const {
  setMode,
  completeOnboarding,
  toggleSync,
  setUserName,
  addPeriodEntry,
  setCycleSettings,
  setGoal,
  setPregnancyLMP,
  updateSettings,
  resetData,
  addLastPeriosdDate,
} = reproductiveSlice.actions;

export default reproductiveSlice.reducer;
