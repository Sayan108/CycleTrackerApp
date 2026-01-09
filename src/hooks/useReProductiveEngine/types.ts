// src/types/reproductive.ts

export type AppMode = 'cycle' | 'pregnancy';

export type DayStatus =
  | 'period'
  | 'fertile'
  | 'fertile-focus'
  | 'ovulation'
  | 'predicted-period'
  | 'safe'
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
    week: 0,
    title: 'Last Menstrual Period',
    description: 'The starting point of your pregnancy journey.',
    medicalNote:
      'Technically not pregnant yet, but used to calculate due date.',
    fetalSize: 'Point of light',
  },
  {
    week: 2,
    title: 'Conception',
    description: 'Fertilization occurs in the fallopian tube.',
    medicalNote: 'Sperm meets egg to create a zygote.',
    fetalSize: 'Microscopic',
  },
  {
    week: 4,
    title: 'Implantation',
    description: 'The blastocyst attaches to the uterine lining.',
    medicalNote: 'hCG begins to rise; home tests may show positive.',
    fetalSize: 'Poppy seed',
  },
  {
    week: 6,
    title: 'First Heartbeat',
    description: 'The neural tube is closing and the heart begins to beat.',
    medicalNote: 'Heartbeat visible via early ultrasound.',
    fetalSize: 'Sweet pea',
  },
  {
    week: 8,
    title: 'Fetal Stage Begins',
    description: 'All essential organs have begun to form.',
    medicalNote: 'Embryo is now officially called a fetus.',
    fetalSize: 'Raspberry',
  },
  {
    week: 10,
    title: 'Vital Organs Functioning',
    description: 'Tail at the bottom of the spinal cord disappears.',
    medicalNote: 'Kidneys, intestines, brain, and liver are starting to work.',
    fetalSize: 'Prune',
  },
  {
    week: 12,
    title: 'End of 1st Trimester',
    description: 'The "danger zone" for early miscarriage typically passes.',
    medicalNote: 'Nuchal translucency scan window for genetic screening.',
    fetalSize: 'Lime',
  },
  {
    week: 14,
    title: 'The Golden Period',
    description: 'Morning sickness usually fades; energy returns.',
    medicalNote: 'Second trimester begins.',
    fetalSize: 'Lemon',
  },
  {
    week: 16,
    title: 'Gender Discovery',
    description: 'Genitals are fully formed and may be seen on ultrasound.',
    medicalNote: 'AFP (Alpha-fetoprotein) test window.',
    fetalSize: 'Avocado',
  },
  {
    week: 20,
    title: 'Mid-Pregnancy Milestone',
    description: 'You are halfway there! Movements (quickening) are common.',
    medicalNote: 'The 20-week Anatomy Scan (Anomaly Scan) takes place.',
    fetalSize: 'Banana',
  },
  {
    week: 24,
    title: 'Viability Milestone',
    description: 'Lungs begin to produce surfactant for breathing.',
    medicalNote: 'Fetus has a chance of survival if born now (NICU required).',
    fetalSize: 'Ear of corn',
  },
  {
    week: 28,
    title: '3rd Trimester Begins',
    description: 'Baby can open eyes and sense light changes.',
    medicalNote: 'Glucose screening test for gestational diabetes.',
    fetalSize: 'Eggplant',
  },
  {
    week: 32,
    title: 'Practice Breathing',
    description: 'Baby is practicing "breathing" by inhaling amniotic fluid.',
    medicalNote: 'Baby usually turns into a head-down position.',
    fetalSize: 'Squash',
  },
  {
    week: 36,
    title: 'GBS Screening',
    description: 'Baby is rapidly gaining weight and fat storage.',
    medicalNote: 'Group B Strep (GBS) test usually performed.',
    fetalSize: 'Papaya',
  },
  {
    week: 37,
    title: 'Early Term',
    description: 'Lungs and brain are reaching full maturity.',
    medicalNote: 'Considered "early term"—delivery now is generally safe.',
    fetalSize: 'Romaine Lettuce',
  },
  {
    week: 40,
    title: 'Full Term / Due Date',
    description: 'Pregnancy is complete. Your body is ready for labor.',
    medicalNote: 'Cervical checks and labor signs monitoring.',
    fetalSize: 'Pumpkin',
  },
];

/* ================== RETURN TYPES ================== */

export interface CycleTrackerData {
  /* Core */
  cycleLength: number;
  ovulation: Date;
  nextPeriod: Date;
  fertileWindow: {
    start: Date;
    end: Date;
  };
  irregularityScore: number;
  goal?: string;

  /* UI */
  ovulationFormatted: string;
  nextPeriodFormatted: string;
  daysUntilNextPeriod: string;
  daysUntilOvulation: string;
  isOvulationToday: boolean;

  /* Calendar */
  dayStatus: (date: Date) => DayStatus;
}

export interface PregnancyTrackerData {
  weeks: number;
  daysPregnant: number;
  trimester: number;
  trimesterLabel: string;
  dueDate: Date;
  dueDateFormatted: string;
  milestones: {
    week: number;
    title: string;
    description?: string;
    medicalNote?: string;
    fetalSize?: string;
  }[];
  latestMilestone: string | null;

  dayStatus: any;
}

export interface ReproductiveTrackerReturn {
  today: Date;
  mode: AppMode;
  goal?: string;
  cycle: CycleTrackerData | null;
  pregnancy: PregnancyTrackerData | null;
}
