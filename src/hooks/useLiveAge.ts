import { useEffect, useState } from 'react';

const BIRTH_DATE = '2006-12-27T00:00:00';

export const useLiveAge = () => {
  const [age, setAge] = useState('');

  useEffect(() => {
    const calculateAge = () => {
      const birth = new Date(BIRTH_DATE).getTime();
      const now = new Date().getTime();
      const diffMs = now - birth;

      const diffYears = diffMs / (1000 * 60 * 60 * 24 * 365.25);
      // Format to 9 decimal places for a beautiful constantly ticking look
      setAge(diffYears.toFixed(9));
    };

    calculateAge();
    const interval = setInterval(calculateAge, 50); // fast tick for buttery smooth animations

    return () => clearInterval(interval);
  }, []);

  return age;
};
