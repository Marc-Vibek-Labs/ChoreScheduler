import { useEffect, useState } from 'react';

export const useCurrentDateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const dateString = currentDateTime.toLocaleDateString('en-MY', { year: 'numeric', month: 'short', day: 'numeric' });
  const timeString = currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  useEffect(() => {
    const interval = setInterval(() => setCurrentDateTime(new Date()), 1000 * 60);

    return () => {
      clearInterval(interval);
    };
  });

  return { currentDateTime, dateString, timeString };
};
