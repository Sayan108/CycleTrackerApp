// src/types/reproductive.ts

export type AppMode = 'cycle' | 'pregnancy';

export type DayStatus =
  | 'period'
  | 'fertile'
  | 'ovulation'
  | 'predicted-period'
  | 'safe'
  | 'pregnant'
  | 'trimester-1'
  | 'trimester-2'
  | 'trimester-3';

export interface CycleHistory {
  startDate: string; // ISO
  cycleLength: number;
}

export interface CycleInput {
  lastPeriodDate: string;
  periodLength: number;
  averageCycleLength: number;
  history?: CycleHistory[];
}

export interface PregnancyInput {
  lmpDate: string;
}

export interface PregnancyMilestone {
  week: number;
  title: string;
  description: string;
  medicalNote: string;
}

// src/hooks/useReproductiveTracker/pregnancyMilestones.ts

export const pregnancyMilestones = [
  {
    week: 4,
    title: 'Implantation',
    description: 'Embryo implants in uterus',
    medicalNote: 'hCG hormone begins rising',
  },
  {
    week: 6,
    title: 'Heartbeat detectable',
    description: 'Heartbeat visible via ultrasound',
    medicalNote: 'Critical organ development phase',
  },
  {
    week: 12,
    title: 'End of 1st Trimester',
    description: 'Major organs formed',
    medicalNote: 'Miscarriage risk drops significantly',
  },
  {
    week: 20,
    title: 'Halfway point',
    description: 'Fetal movements felt',
    medicalNote: 'Anomaly scan window',
  },
  {
    week: 28,
    title: '3rd Trimester begins',
    description: 'Rapid brain growth',
    medicalNote: 'Preterm labor risk begins',
  },
  {
    week: 37,
    title: 'Full term',
    description: 'Baby ready for birth',
    medicalNote: 'Normal delivery window',
  },
];
