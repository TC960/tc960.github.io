import React, { useState, useEffect } from 'react';

const ScrambleText = ({ text, orangeText = '' }) => {
  const [displayText, setDisplayText] = useState(text);

  const chars = '@#$%&*!?░▒▓█ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  useEffect(() => {
    let intervalId;
    let timeoutId;

    const scramble = () => {
      let iterations = 0;

      intervalId = setInterval(() => {
        setDisplayText(
          text.split('').map((char, index) => {
            if (char === ' ') return ' ';

            // Gradually resolve characters from left to right
            if (iterations > index) {
              return text[index];
            }

            // Otherwise show random character
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('')
        );

        iterations++;

        if (iterations > text.length + 5) {
          clearInterval(intervalId);
          setDisplayText(text);

          // Hold for 3-4 seconds, then scramble again
          timeoutId = setTimeout(scramble, 3500);
        }
      }, 50);
    };

    // Start the animation after initial mount
    const initialDelay = setTimeout(scramble, 1000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      clearTimeout(initialDelay);
    };
  }, [text]);

  // Find where orange text starts
  const orangeIndex = text.indexOf(orangeText);

  if (orangeText && orangeIndex !== -1) {
    const beforeOrange = displayText.substring(0, orangeIndex);
    const orangePart = displayText.substring(orangeIndex, orangeIndex + orangeText.length);
    const afterOrange = displayText.substring(orangeIndex + orangeText.length);

    return (
      <>
        {beforeOrange}
        <br />
        <span className="text-accent-orange">{orangePart}</span>
        {afterOrange}
      </>
    );
  }

  return <>{displayText}</>;
};

export default ScrambleText;
