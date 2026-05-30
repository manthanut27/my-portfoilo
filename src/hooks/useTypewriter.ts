import { useEffect, useState } from 'react';

export const useTypewriter = (
  words: string[],
  typeSpeed: number = 60,
  backSpeed: number = 40,
  delay: number = 3000
) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: any;
    const currentWord = words[wordIndex];

    const handleType = () => {
      if (!isDeleting) {
        // Typing
        setCurrentText(currentWord.substring(0, currentText.length + 1));

        if (currentText === currentWord) {
          // Finished typing, pause before deleting
          timer = setTimeout(() => setIsDeleting(true), delay);
          return;
        }

        timer = setTimeout(handleType, typeSpeed);
      } else {
        // Backspacing
        setCurrentText(currentWord.substring(0, currentText.length - 1));

        if (currentText === '') {
          // Finished deleting, move to next word
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
          return;
        }

        timer = setTimeout(handleType, backSpeed);
      }
    };

    timer = setTimeout(handleType, isDeleting ? backSpeed : typeSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, words, typeSpeed, backSpeed, delay]);

  return currentText;
};
