import React, { useEffect } from 'react';
import { motion, stagger, useAnimate } from 'framer-motion';

// Utility function to conditionally join classNames (optional)
const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

interface TextGenerateEffectProps {
  words: string;
  className?: string;
}

export const TextGenerateEffect: React.FC<TextGenerateEffectProps> = ({
  words,
  className='',
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(' ');

  useEffect(() => {
    animate(
      'span',
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      }
    );
  }, [animate]);

  const renderWords = () => (
    <motion.div ref={scope}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={`${word}${idx}`}
          className="text-gray-400 opacity-0"
        >
          {word}{' '}
        </motion.span>
      ))}
    </motion.div>
  );

  return (
    <div className={cn('', className)}>
      <div className="">
        <div className="text-gray-400 text-sm leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
