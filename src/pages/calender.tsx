import React from 'react';
import AppLayout from '../components/shared/layout';
import { CalendarDashboard } from '../components/calender/calender';

export const CalenderScreen = () => {
  return (
    <AppLayout title="Calender">
      <CalendarDashboard />
    </AppLayout>
  );
};

export default CalenderScreen;
