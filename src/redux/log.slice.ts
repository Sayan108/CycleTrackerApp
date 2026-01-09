import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface DailyLog {
  // Qualitative
  mood: string;
  flow: string; // Cycle only
  symptoms: string[]; // Cycle only
  pregSymptoms: string[]; // Pregnancy only

  // Quantitative (Metrics)
  water: number;
  exercise: number; // Cycle focus
  kicks: number; // Pregnancy focus
}

interface LogsState {
  history: Record<string, DailyLog>;
}

const initialState: LogsState = {
  history: {},
};

export const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    // Save qualitative status
    saveStatus: (
      state,
      action: PayloadAction<{date: string; data: Partial<DailyLog>}>,
    ) => {
      const {date, data} = action.payload;
      if (!state.history[date]) {
        state.history[date] = {
          mood: 'Happy',
          flow: 'None',
          symptoms: [],
          pregSymptoms: [],
          water: 0,
          exercise: 0,
          kicks: 0,
        };
      }
      state.history[date] = {...state.history[date], ...data};
    },
    // Increment/Decrement metrics
    updateMetric: (
      state,
      action: PayloadAction<{
        date: string;
        field: keyof DailyLog;
        value: number;
      }>,
    ) => {
      const {date, field, value} = action.payload;
      if (!state.history[date]) {
        state.history[date] = {
          mood: 'Happy',
          flow: 'None',
          symptoms: [],
          pregSymptoms: [],
          water: 0,
          exercise: 0,
          kicks: 0,
        };
      }
      const currentVal = (state.history[date][field] as number) || 0;
      (state.history[date][field] as any) = Math.max(0, currentVal + value);
    },
  },
});

export const {saveStatus, updateMetric} = logsSlice.actions;
export default logsSlice.reducer;
