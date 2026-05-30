'use client';
import { useState, useEffect } from 'react';
import { DOB } from '@/lib/constants';

interface AgeBreakdown {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const PLACEHOLDER: AgeBreakdown = { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

export function useLiveAge(): { age: AgeBreakdown; mounted: boolean } {
  const [age, setAge] = useState<AgeBreakdown>(PLACEHOLDER);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setAge(calculateAge());

    const interval = setInterval(() => {
      setAge(calculateAge());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return { age, mounted };
}

function calculateAge(): AgeBreakdown {
  const now = new Date();
  let years = now.getFullYear() - DOB.getFullYear();
  let months = now.getMonth() - DOB.getMonth();
  let days = now.getDate() - DOB.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    years,
    months,
    days,
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
  };
}
