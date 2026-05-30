'use client';
import { useState, useEffect, useCallback, useRef } from 'react';

export function useTypewriter(
  strings: readonly string[],
  options: {
    typeSpeed?: number;
    deleteSpeed?: number;
    pauseDuration?: number;
  } = {}
) {
  const { typeSpeed = 60, deleteSpeed = 40, pauseDuration = 3000 } = options;
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [stringIndex, setStringIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor(v => !v), 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentString = strings[stringIndex];

    const tick = () => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentString.length) {
          setDisplayText(currentString.slice(0, displayText.length + 1));
          timeoutRef.current = setTimeout(tick, typeSpeed);
        } else {
          // Pause before deleting
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
            tick();
          }, pauseDuration);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
          timeoutRef.current = setTimeout(tick, deleteSpeed);
        } else {
          setIsDeleting(false);
          setStringIndex((stringIndex + 1) % strings.length);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayText, isDeleting, stringIndex, strings, typeSpeed, deleteSpeed, pauseDuration]);

  return { displayText, showCursor };
}
