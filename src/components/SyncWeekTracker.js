'use client';

import { useEffect } from 'react';

export default function SyncWeekTracker({ weekNumber }) {
  useEffect(() => {
    // If the user lands on a week, advance their dashboard tracker to this week 
    // (or keep it there if they went back)
    const currentMax = parseInt(localStorage.getItem('eh_current_week') || '1', 10);
    if (weekNumber > currentMax) {
      localStorage.setItem('eh_current_week', weekNumber.toString());
    } else {
      localStorage.setItem('eh_current_week', weekNumber.toString()); // Force sync it so DashboardOverview updates
    }
  }, [weekNumber]);

  return null;
}
