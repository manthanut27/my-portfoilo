import { useEffect, useState, useRef } from 'react';

export const useTypewriter = (
  words: string[],
  typeSpeed: number = 60,
  backSpeed: number = 40,
  delay: number = 3000
) => {
  const [currentText, setCurrentText] = useState('');
  const wordIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const textRef = useRef('');

  useEffect(() => {
    let timer: any;

    const tick = () => {
      const currentWord = words[wordIndexRef.current];
      const isDeleting = isDeletingRef.current;
      const text = textRef.current;

      if (!isDeleting) {
        // Typing: Add one character
        const nextText = currentWord.substring(0, text.length + 1);
        textRef.current = nextText;
        setCurrentText(nextText);

        if (nextText === currentWord) {
          // Fully typed: Pause before deleting
          isDeletingRef.current = true;
          timer = setTimeout(tick, delay);
        } else {
          // Keep typing
          timer = setTimeout(tick, typeSpeed);
        }
      } else {
        // Deleting: Remove one character
        const nextText = currentWord.substring(0, text.length - 1);
        textRef.current = nextText;
        setCurrentText(nextText);

        if (nextText === '') {
          isDeletingRef.current = false;
          // Move to next word
          wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
          timer = setTimeout(tick, 500); // brief pause before starting next word
        } else {
          // Keep deleting
          timer = setTimeout(tick, backSpeed);
        }
      }
    };

    // Initiate typewriter loop
    timer = setTimeout(tick, typeSpeed);

    return () => clearTimeout(timer);
  }, [words.join('|'), typeSpeed, backSpeed, delay]);

  return currentText;
};
export default useTypewriter;
